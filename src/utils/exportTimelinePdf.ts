import { jsPDF } from 'jspdf';
import { TimelineDeadlineItem, ShortlistedUniversity } from '../components/ApplicationTracker';

export interface ExportPdfOptions {
  timelineItems: TimelineDeadlineItem[];
  universities: ShortlistedUniversity[];
  completedMilestones: string[];
  totalChecklistMilestones: { id: string; category: string; title: string }[];
}

export function exportTimelineToPdf({
  timelineItems,
  universities,
  completedMilestones,
  totalChecklistMilestones
}: ExportPdfOptions) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Helper to add page if needed
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 15) {
      doc.addPage();
      y = 15;
      renderHeaderMini();
    }
  };

  const renderHeaderMini = () => {
    doc.setFontSize(8);
    doc.setTextColor(120, 113, 108); // stone-500
    doc.setFont('helvetica', 'normal');
    doc.text('GlobalPath: Admissions Timeline & Milestone Dossier', margin, 10);
    doc.text(todayStr, pageWidth - margin, 10, { align: 'right' });
    doc.setDrawColor(214, 211, 209);
    doc.setLineWidth(0.2);
    doc.line(margin, 12, pageWidth - margin, 12);
  };

  // --- Title Header Block ---
  doc.setFillColor(28, 25, 23); // stone-900
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('GlobalPath Admissions Dossier', margin + 6, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(245, 245, 244);
  doc.text(
    `Personalized Application Timeline, Deadlines & Shortlist Roadmap · Generated ${todayStr}`,
    margin + 6,
    y + 16
  );

  y += 28;

  // --- Summary Metrics Box ---
  const completedDeadlinesCount = timelineItems.filter(i => i.completed).length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const urgentCount = timelineItems.filter(i => {
    if (i.completed) return false;
    const target = new Date(i.date);
    target.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 14;
  }).length;

  const checklistPct = Math.round(
    (completedMilestones.length / Math.max(1, totalChecklistMilestones.length)) * 100
  );

  doc.setFillColor(245, 245, 244); // stone-100
  doc.roundedRect(margin, y, contentWidth, 16, 1.5, 1.5, 'F');
  doc.setDrawColor(231, 229, 228);
  doc.roundedRect(margin, y, contentWidth, 16, 1.5, 1.5, 'S');

  doc.setFontSize(8);
  doc.setTextColor(87, 83, 78); // stone-600
  doc.setFont('helvetica', 'bold');

  const colW = contentWidth / 4;
  doc.text('TOTAL DEADLINES', margin + 6, y + 6);
  doc.text('URGENT DEADLINES', margin + colW + 6, y + 6);
  doc.text('TARGET COLLEGES', margin + colW * 2 + 6, y + 6);
  doc.text('CHECKLIST PROGRESS', margin + colW * 3 + 6, y + 6);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
  doc.text(`${timelineItems.length} (${completedDeadlinesCount} Done)`, margin + 6, y + 12);

  doc.setTextColor(urgentCount > 0 ? 190 : 28, urgentCount > 0 ? 24 : 25, urgentCount > 0 ? 24 : 23);
  doc.text(`${urgentCount} Due Soon`, margin + colW + 6, y + 12);

  doc.setTextColor(28, 25, 23);
  doc.text(`${universities.length} Shortlisted`, margin + colW * 2 + 6, y + 12);
  doc.text(`${checklistPct}% (${completedMilestones.length}/${totalChecklistMilestones.length})`, margin + colW * 3 + 6, y + 12);

  y += 22;

  // --- SECTION 1: Chronological Deadlines & Milestones ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(28, 25, 23);
  doc.text('1. Chronological Timeline & Deadlines', margin, y);
  y += 5;

  // Table header
  doc.setFillColor(231, 229, 228); // stone-200
  doc.rect(margin, y, contentWidth, 6.5, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(68, 64, 60);

  doc.text('TARGET DATE', margin + 3, y + 4.5);
  doc.text('MILESTONE TITLE & DETAILS', margin + 32, y + 4.5);
  doc.text('CATEGORY', margin + 118, y + 4.5);
  doc.text('STATUS & COUNTDOWN', margin + 148, y + 4.5);

  y += 7.5;

  const sortedDeadlines = [...timelineItems].sort((a, b) => a.date.localeCompare(b.date));

  sortedDeadlines.forEach((item, index) => {
    checkPageBreak(13);

    const target = new Date(item.date);
    target.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let statusText = '';
    if (item.completed) {
      statusText = '[DONE] Completed';
    } else if (diffDays < 0) {
      statusText = `[!] OVERDUE (${Math.abs(diffDays)}d ago)`;
    } else if (diffDays === 0) {
      statusText = '[!] DUE TODAY';
    } else if (diffDays <= 7) {
      statusText = `[!] URGENT: In ${diffDays}d`;
    } else {
      statusText = `In ${diffDays} days`;
    }

    // Row alternating background
    if (index % 2 === 1) {
      doc.setFillColor(250, 250, 249); // stone-50
      doc.rect(margin, y - 1, contentWidth, 11, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(28, 25, 23);
    doc.text(item.date, margin + 3, y + 3.5);

    doc.text(doc.splitTextToSize(item.title, 82)[0], margin + 32, y + 3.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    if (item.reminderNote) {
      const wrappedNote = doc.splitTextToSize(item.reminderNote, 82)[0];
      doc.text(wrappedNote, margin + 32, y + 7.5);
    } else if (item.university) {
      doc.text(`Target College: ${item.university}`, margin + 32, y + 7.5);
    }

    doc.setFontSize(7.5);
    doc.setTextColor(80, 80, 80);
    doc.text(item.category, margin + 118, y + 3.5);

    // Status text color
    if (item.completed) {
      doc.setTextColor(22, 101, 52); // emerald-800
      doc.setFont('helvetica', 'bold');
    } else if (diffDays <= 7) {
      doc.setTextColor(185, 28, 28); // red-700
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setTextColor(70, 70, 70);
      doc.setFont('helvetica', 'normal');
    }
    doc.text(statusText, margin + 148, y + 3.5);

    // Subtle row line
    doc.setDrawColor(240, 240, 240);
    doc.line(margin, y + 10, margin + contentWidth, y + 10);

    y += 11.5;
  });

  y += 6;

  // --- SECTION 2: Shortlisted Universities ---
  checkPageBreak(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(28, 25, 23);
  doc.text('2. Target Universities Shortlist', margin, y);
  y += 5;

  doc.setFillColor(231, 229, 228);
  doc.rect(margin, y, contentWidth, 6.5, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(68, 64, 60);

  doc.text('UNIVERSITY NAME', margin + 3, y + 4.5);
  doc.text('COUNTRY & PORTAL', margin + 65, y + 4.5);
  doc.text('DEADLINE', margin + 115, y + 4.5);
  doc.text('TARGET SCORES', margin + 145, y + 4.5);
  doc.text('STATUS', margin + 175, y + 4.5);

  y += 7.5;

  if (universities.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(120, 113, 108);
    doc.text('No universities currently shortlisted.', margin + 3, y + 4);
    y += 8;
  } else {
    universities.forEach((uni, idx) => {
      checkPageBreak(10);

      if (idx % 2 === 1) {
        doc.setFillColor(250, 250, 249);
        doc.rect(margin, y - 1, contentWidth, 8, 'F');
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(28, 25, 23);
      doc.text(doc.splitTextToSize(uni.name, 58)[0], margin + 3, y + 3.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(80, 80, 80);
      doc.text(`${uni.country} · ${uni.portal}`, margin + 65, y + 3.5);
      doc.text(uni.deadline, margin + 115, y + 3.5);
      doc.text(`SAT: ${uni.targetSat} | TOEFL: ${uni.targetToefl}`, margin + 145, y + 3.5);

      doc.setFont('helvetica', 'bold');
      if (uni.status === 'Accepted') doc.setTextColor(22, 101, 52);
      else if (uni.status === 'Submitted') doc.setTextColor(30, 64, 175);
      else doc.setTextColor(100, 100, 100);

      doc.text(uni.status, margin + 175, y + 3.5);

      doc.setDrawColor(240, 240, 240);
      doc.line(margin, y + 7, margin + contentWidth, y + 7);

      y += 8.5;
    });
  }

  y += 6;

  // --- SECTION 3: 18-Step Application Readiness Checklist ---
  checkPageBreak(45);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(28, 25, 23);
  doc.text('3. Core 18-Step Application Readiness Checklist', margin, y);
  y += 5;

  doc.setFillColor(231, 229, 228);
  doc.rect(margin, y, contentWidth, 6.5, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(68, 64, 60);
  doc.text('STATUS', margin + 3, y + 4.5);
  doc.text('STAGE / CATEGORY', margin + 22, y + 4.5);
  doc.text('ACTION ITEM / MILESTONE', margin + 65, y + 4.5);

  y += 7.5;

  totalChecklistMilestones.forEach((m, idx) => {
    checkPageBreak(8);

    const isDone = completedMilestones.includes(m.id);

    if (idx % 2 === 1) {
      doc.setFillColor(250, 250, 249);
      doc.rect(margin, y - 1, contentWidth, 7, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    if (isDone) {
      doc.setTextColor(22, 101, 52);
      doc.text('[X] Done', margin + 3, y + 3.5);
    } else {
      doc.setTextColor(160, 160, 160);
      doc.text('[ ] Pending', margin + 3, y + 3.5);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 100, 100);
    doc.text(m.category, margin + 22, y + 3.5);

    doc.setFont('helvetica', isDone ? 'normal' : 'medium');
    doc.setTextColor(isDone ? 120 : 30, isDone ? 120 : 30, isDone ? 120 : 30);
    const splitTitle = doc.splitTextToSize(m.title, 115)[0];
    doc.text(splitTitle, margin + 65, y + 3.5);

    doc.setDrawColor(245, 245, 245);
    doc.line(margin, y + 6, margin + contentWidth, y + 6);

    y += 7.5;
  });

  // --- Document Footer on all pages ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(140, 135, 130);
    doc.setFont('helvetica', 'normal');
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);
    doc.text(
      'GlobalPath: SAT, TOEFL & Foreign University Admissions Authority',
      margin,
      pageHeight - 7
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 7, {
      align: 'right'
    });
  }

  // Trigger download
  doc.save('GlobalPath_Admissions_Timeline_Roadmap.pdf');
}
