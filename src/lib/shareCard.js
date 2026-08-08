// Renders an affirmation as a downloadable PNG, styled like the site's
// tilted-stamp cards (offset ink border, corner badge, credit watermark),
// entirely client-side via the canvas API.

const DEFAULT_BACKGROUND = "#FF6B4A"; // --coral
const DEFAULT_INK = "#1A1523"; // --ink
const DEFAULT_CARD_BODY = "#FFFFFF"; // --paper-raised
const DEFAULT_BADGE_BACKGROUND = "#FFC145"; // --sun
const SITE_CREDIT = "smartaffirmations.com";

const DISPLAY_FONT = "Georgia, 'Times New Roman', serif";
const BODY_FONT = "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif";

const LONG_TEXT_THRESHOLD = 90;

function roundedRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapLines(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function widestLineWidth(ctx, lines) {
  return lines.reduce((max, line) => Math.max(max, ctx.measureText(line).width), 0);
}

function fitBadgeLabel(ctx, label, maxWidth, maxLines, startSize) {
  const upper = label.toUpperCase();
  let fontSize = startSize;
  let lines = [upper];
  while (fontSize > 14) {
    ctx.font = `800 ${fontSize}px ${BODY_FONT}`;
    lines = wrapLines(ctx, upper, maxWidth);
    if (widestLineWidth(ctx, lines) <= maxWidth && lines.length <= maxLines) break;
    fontSize -= 2;
  }
  return { fontSize, lines, lineHeight: fontSize * 1.15 };
}

function fitQuote(ctx, quote, maxWidth, maxHeight, startSize) {
  let fontSize = startSize;
  let lines = [];
  let lineHeight = 0;
  while (fontSize > 26) {
    ctx.font = `${fontSize}px ${DISPLAY_FONT}`;
    lines = wrapLines(ctx, quote, maxWidth);
    lineHeight = fontSize * 1.35;
    if (lines.length * lineHeight <= maxHeight) break;
    fontSize -= 4;
  }
  return { fontSize, lines, lineHeight };
}

function drawCard(ctx, { cardX, cardY, cardW, cardH, angleDeg, ink, cardBody, borderWidth, shadowOffset, radius }) {
  ctx.save();
  ctx.translate(cardX + cardW / 2, cardY + cardH / 2);
  ctx.rotate((angleDeg * Math.PI) / 180);
  ctx.translate(-cardW / 2, -cardH / 2);

  ctx.fillStyle = ink;
  roundedRectPath(ctx, shadowOffset, shadowOffset, cardW, cardH, radius);
  ctx.fill();

  ctx.fillStyle = cardBody;
  roundedRectPath(ctx, 0, 0, cardW, cardH, radius);
  ctx.fill();
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = ink;
  roundedRectPath(ctx, 0, 0, cardW, cardH, radius);
  ctx.stroke();

  return () => ctx.restore(); // caller draws text inside this same rotated frame, then calls this
}

function drawBadge(ctx, { centerX, centerY, radius, angleDeg, ink, background, badgeInk, label, borderWidth, shadowOffset }) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((angleDeg * Math.PI) / 180);

  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.arc(shadowOffset, shadowOffset, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = background;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = ink;
  ctx.stroke();

  ctx.fillStyle = badgeInk;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const { fontSize, lines, lineHeight } = fitBadgeLabel(ctx, label, radius * 1.2, 3, 30);
  ctx.font = `800 ${fontSize}px ${BODY_FONT}`;
  let y = (-(lines.length - 1) * lineHeight) / 2;
  for (const line of lines) {
    ctx.fillText(line, 0, y);
    y += lineHeight;
  }

  ctx.restore();
}

export async function downloadAffirmationCard({
  text,
  badgeLabel = "my affirmation",
  background = DEFAULT_BACKGROUND,
  ink = DEFAULT_INK,
  badgeBackground = DEFAULT_BADGE_BACKGROUND,
  badgeInk = DEFAULT_INK,
  filename = "smart-affirmation.png",
}) {
  const quote = `“${text}”`;
  const isLong = text.length > LONG_TEXT_THRESHOLD;
  const width = 1080;
  const height = isLong ? 1350 : 1080;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const cardMarginX = 96;
  const cardTop = isLong ? 170 : 150;
  const cardBottom = height - 150;
  const cardW = width - cardMarginX * 2;
  const cardH = cardBottom - cardTop;
  const borderWidth = 10;
  const shadowOffset = 20;

  const restoreCard = drawCard(ctx, {
    cardX: cardMarginX,
    cardY: cardTop,
    cardW,
    cardH,
    angleDeg: -2,
    ink,
    cardBody: DEFAULT_CARD_BODY,
    borderWidth,
    shadowOffset,
    radius: 42,
  });

  const textPaddingX = 90;
  const { fontSize, lines, lineHeight } = fitQuote(
    ctx,
    quote,
    cardW - textPaddingX * 2,
    cardH - 140,
    isLong ? 56 : 68
  );

  ctx.font = `${fontSize}px ${DISPLAY_FONT}`;
  ctx.fillStyle = ink;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const blockHeight = lines.length * lineHeight;
  let textY = cardH / 2 - blockHeight / 2 + lineHeight / 2;
  for (const line of lines) {
    ctx.fillText(line, cardW / 2, textY);
    textY += lineHeight;
  }

  restoreCard();

  drawBadge(ctx, {
    centerX: cardMarginX + cardW - 34,
    centerY: cardTop - 6,
    radius: 92,
    angleDeg: 9,
    ink,
    background: badgeBackground,
    badgeInk,
    label: badgeLabel,
    borderWidth: borderWidth * 0.8,
    shadowOffset: shadowOffset * 0.55,
  });

  ctx.fillStyle = ink;
  ctx.font = `700 30px ${BODY_FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.globalAlpha = 0.85;
  ctx.fillText(SITE_CREDIT, width / 2, height - 64);
  ctx.globalAlpha = 1;

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("failed to render share card");

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
