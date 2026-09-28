// Google Gmail API Integration Service (Client-Side Bearer Token)

export interface GmailMessageHeader {
  name: string;
  value: string;
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  labelIds?: string[];
  unread?: boolean;
}

export interface GmailMessageDetail extends GmailMessageSummary {
  bodyText?: string;
  bodyHtml?: string;
}

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

// Convert Unicode string to base64url per RFC 4648
function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Convert base64 / base64url to Unicode string
function base64UrlDecode(str: string): string {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (e) {
    return '';
  }
}

export const gmailService = {
  // Fetch user profile stats
  async getProfile(accessToken: string): Promise<GmailProfile> {
    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gmail profile error (${res.status}): ${errorText}`);
    }
    return res.json();
  },

  // List messages with optional search query (e.g. "admissions OR college OR SAT OR TOEFL")
  async listMessages(
    accessToken: string,
    params: { maxResults?: number; q?: string; pageToken?: string } = {}
  ): Promise<{ messages: { id: string; threadId: string }[]; nextPageToken?: string; resultSizeEstimate?: number }> {
    const url = new URL('https://gmail.googleapis.com/gmail/v1/users/me/messages');
    url.searchParams.set('maxResults', String(params.maxResults || 20));
    if (params.q) url.searchParams.set('q', params.q);
    if (params.pageToken) url.searchParams.set('pageToken', params.pageToken);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gmail list messages error (${res.status}): ${errorText}`);
    }
    return res.json();
  },

  // Get full message details
  async getMessage(accessToken: string, messageId: string): Promise<GmailMessageDetail> {
    const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gmail message detail error (${res.status}): ${errorText}`);
    }
    const data = await res.json();

    const headers: GmailMessageHeader[] = data.payload?.headers || [];
    const getHeader = (name: string) => headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || '';

    // Extract body text / html
    let bodyText = '';
    let bodyHtml = '';

    const parsePayloadParts = (part: any) => {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        bodyText += base64UrlDecode(part.body.data);
      } else if (part.mimeType === 'text/html' && part.body?.data) {
        bodyHtml += base64UrlDecode(part.body.data);
      }
      if (part.parts && Array.isArray(part.parts)) {
        part.parts.forEach(parsePayloadParts);
      }
    };

    if (data.payload) {
      if (data.payload.body?.data) {
        if (data.payload.mimeType === 'text/html') {
          bodyHtml = base64UrlDecode(data.payload.body.data);
        } else {
          bodyText = base64UrlDecode(data.payload.body.data);
        }
      }
      if (data.payload.parts) {
        data.payload.parts.forEach(parsePayloadParts);
      }
    }

    return {
      id: data.id,
      threadId: data.threadId,
      snippet: data.snippet,
      subject: getHeader('Subject') || '(No Subject)',
      from: getHeader('From') || 'Unknown Sender',
      to: getHeader('To') || '',
      date: getHeader('Date') || '',
      labelIds: data.labelIds || [],
      unread: data.labelIds?.includes('UNREAD') || false,
      bodyText: bodyText || data.snippet || '',
      bodyHtml: bodyHtml || ''
    };
  },

  // Send email (RFC 2822 raw base64url encoded message)
  // MANDATORY USER CONFIRMATION REQUIRED BEFORE CALLING THIS!
  async sendEmail(
    accessToken: string,
    params: { to: string; subject: string; body: string; replyToMessageId?: string; threadId?: string }
  ): Promise<{ id: string; threadId: string; labelIds: string[] }> {
    const lines = [
      `To: ${params.to}`,
      `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(params.subject)))}?=`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      ''
    ];

    if (params.replyToMessageId) {
      lines.unshift(`In-Reply-To: ${params.replyToMessageId}`);
      lines.unshift(`References: ${params.replyToMessageId}`);
    }

    lines.push(params.body);
    const rawRfc2822 = lines.join('\r\n');
    const encodedMessage = base64UrlEncode(rawRfc2822);

    const payload: any = { raw: encodedMessage };
    if (params.threadId) {
      payload.threadId = params.threadId;
    }

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gmail send error (${res.status}): ${err}`);
    }
    return res.json();
  },

  // Create a draft
  async createDraft(
    accessToken: string,
    params: { to: string; subject: string; body: string }
  ): Promise<{ id: string; message: any }> {
    const rawRfc2822 = [
      `To: ${params.to}`,
      `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(params.subject)))}?=`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      params.body
    ].join('\r\n');

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: {
          raw: base64UrlEncode(rawRfc2822)
        }
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gmail draft error (${res.status}): ${err}`);
    }
    return res.json();
  }
};
