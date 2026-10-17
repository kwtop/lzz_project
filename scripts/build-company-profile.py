from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "lzz-company-profile-2026.pdf"
LOGO = ROOT / "public" / "media" / "lzz-logo.png"
WORKSHOP_IMAGE = ROOT / "scripts" / "assets" / "company-profile-workshop.jpg"
INSPECTION_IMAGE = ROOT / "scripts" / "assets" / "company-profile-inspection.jpg"

PAGE_W, PAGE_H = 420 * mm, 285 * mm
INK = HexColor("#1d252c")
BLUE = HexColor("#15519f")
RED = HexColor("#cf1d27")
MUTED = HexColor("#5e6870")
PALE = HexColor("#f2f4f5")
LINE = HexColor("#d9dee1")
WHITE = colors.white

FONT_DIR = Path("C:/Windows/Fonts")
pdfmetrics.registerFont(TTFont("LZZSans", str(FONT_DIR / "arial.ttf")))
pdfmetrics.registerFont(TTFont("LZZSans-Bold", str(FONT_DIR / "arialbd.ttf")))

TITLE = ParagraphStyle(
    "title", fontName="LZZSans-Bold", fontSize=37, leading=43,
    textColor=INK, alignment=TA_LEFT, spaceAfter=0,
)
SUBTITLE = ParagraphStyle(
    "subtitle", fontName="LZZSans", fontSize=15, leading=22,
    textColor=MUTED, alignment=TA_LEFT,
)
BODY = ParagraphStyle(
    "body", fontName="LZZSans", fontSize=11.5, leading=17,
    textColor=INK, alignment=TA_LEFT,
)
BODY_SMALL = ParagraphStyle(
    "body-small", fontName="LZZSans", fontSize=9.5, leading=14,
    textColor=INK, alignment=TA_LEFT,
)
NOTE = ParagraphStyle(
    "note", fontName="LZZSans", fontSize=8.3, leading=12,
    textColor=MUTED, alignment=TA_LEFT,
)
CARD = ParagraphStyle(
    "card", fontName="LZZSans", fontSize=9.5, leading=13,
    textColor=INK, alignment=TA_LEFT,
)


def draw_paragraph(pdf, text, x, top, width, style):
    block = Paragraph(text, style)
    _, height = block.wrap(width, PAGE_H)
    block.drawOn(pdf, x, top - height)
    return top - height


def section_heading(pdf, text, x, y, size=16):
    pdf.setFillColor(RED)
    pdf.roundRect(x, y - 3, 4, 17, 2, stroke=0, fill=1)
    pdf.setFillColor(INK)
    pdf.setFont("LZZSans-Bold", size)
    pdf.drawString(x + 13, y, text)


def draw_header(pdf, eyebrow, page_number):
    pdf.drawImage(str(LOGO), 48, PAGE_H - 83, width=112, height=55,
                  preserveAspectRatio=True, anchor="c", mask="auto")
    pdf.setFillColor(BLUE)
    pdf.setFont("LZZSans-Bold", 9)
    pdf.drawRightString(PAGE_W - 48, PAGE_H - 47, "HANGZHOU LIZHIZAO PRECISION MACHINERY CO., LTD.")
    pdf.setFillColor(MUTED)
    pdf.setFont("LZZSans", 8)
    pdf.drawRightString(PAGE_W - 48, PAGE_H - 64, eyebrow.upper())
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.8)
    pdf.line(48, PAGE_H - 98, PAGE_W - 48, PAGE_H - 98)
    pdf.setFillColor(MUTED)
    pdf.setFont("LZZSans", 8)
    pdf.drawRightString(PAGE_W - 48, 25, f"LZZ PRECISION  |  {page_number:02d} / 02")
    pdf.drawString(48, 25, "Custom CNC machining in Hangzhou, China  |  www.lzz-cnc.com")


def draw_bullet(pdf, text, x, top, width, style=BODY_SMALL):
    pdf.setFillColor(RED)
    pdf.circle(x + 3, top - 7, 2.1, stroke=0, fill=1)
    return draw_paragraph(pdf, text, x + 14, top, width - 14, style) - 7


def draw_step(pdf, number, title, body, x, top, width):
    pdf.setFillColor(BLUE)
    pdf.circle(x + 11, top - 10, 10, stroke=0, fill=1)
    pdf.setFillColor(WHITE)
    pdf.setFont("LZZSans-Bold", 8)
    pdf.drawCentredString(x + 11, top - 13, number)
    pdf.setFillColor(INK)
    pdf.setFont("LZZSans-Bold", 10.3)
    pdf.drawString(x + 31, top - 7, title)
    end_y = draw_paragraph(pdf, body, x + 31, top - 17, width - 34, CARD)
    return min(top - 67, end_y - 8)


def main():
    if not all(path.exists() for path in (LOGO, WORKSHOP_IMAGE, INSPECTION_IMAGE)):
        missing = [str(path) for path in (LOGO, WORKSHOP_IMAGE, INSPECTION_IMAGE) if not path.exists()]
        raise FileNotFoundError("Missing company-profile assets: " + ", ".join(missing))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    pdf.setTitle("LZZ Precision - Company and Capability Profile 2026")
    pdf.setAuthor("Hangzhou Lizhizao Precision Machinery Co., Ltd.")
    pdf.setSubject("CNC machining capabilities, project workflow and RFQ preparation")

    # Page 1: company profile and verified operating context.
    pdf.setFillColor(WHITE)
    pdf.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    pdf.setFillColor(RED)
    pdf.rect(0, 0, 8, PAGE_H, stroke=0, fill=1)
    draw_header(pdf, "Company profile 2026", 1)

    draw_paragraph(pdf, "Custom CNC machining<br/>for parts made to drawing", 50, PAGE_H - 145, 535, TITLE)
    draw_paragraph(
        pdf,
        "LZZ is an ISO 9001-certified company machining custom parts from supplied drawings or samples. "
        "We review geometry, material, finish and inspection requirements before confirming an order.",
        52, PAGE_H - 258, 520, SUBTITLE,
    )

    section_heading(pdf, "Machining services", 52, PAGE_H - 365, 15)
    y = PAGE_H - 396
    y = draw_bullet(pdf, "CNC milling and turning for custom parts and assemblies.", 54, y, 515)
    y = draw_bullet(pdf, "5-axis and multi-axis machining, with tool access and machine capacity assessed from your drawing.", 54, y, 515)
    y = draw_bullet(pdf, "Orders from 1 piece. Production takes 7-14 business days after drawing and order confirmation, including surface finishing; shipping time is additional.", 54, y, 515)

    pdf.drawImage(str(WORKSHOP_IMAGE), 638, 370, width=450, height=300,
                  preserveAspectRatio=True, anchor="c", mask="auto")
    # Internal provenance: workshop asset is AI-generated, not an LZZ factory photograph or equipment inventory.
    section_heading(pdf, "Parts and materials", 638, 319, 14)
    draw_paragraph(
        pdf,
        "Examples include instrument housings, brackets, machined interfaces and prototype components. "
        "Common material families include aluminum, stainless steel, copper and brass, steels, and engineering plastics. "
        "Confirm the exact grade, condition and finish for each part.",
        638, 297, 510, BODY_SMALL,
    )

    pdf.setFillColor(PALE)
    pdf.roundRect(48, 88, PAGE_W - 96, 157, 8, stroke=0, fill=1)
    facts = [
        ("2017", "Founded in Hangzhou"),
        ("1,500 m2", "Production facility"),
        ("40+", "Machining and support equipment"),
        ("15+ years", "Engineering team experience"),
        ("About 100,000", "Parts per month - reference capacity"),
    ]
    col_w = (PAGE_W - 112) / len(facts)
    for index, (value, label) in enumerate(facts):
        x = 56 + index * col_w
        if index:
            pdf.setStrokeColor(LINE)
            pdf.line(x - 8, 162, x - 8, 222)
        pdf.setFillColor(BLUE)
        pdf.setFont("LZZSans-Bold", 21 if index < 4 else 15)
        pdf.drawString(x, 195, value)
        draw_paragraph(pdf, label, x, 174, col_w - 18, NOTE)
    draw_paragraph(
        pdf,
        "Application examples in the company brochure include laboratory and medical equipment, automotive and motorcycle parts, hydraulics, agriculture, robotics, aerospace and defense, semiconductor equipment, and fans/impellers. Discuss suitability, required approvals and export requirements for your project.",
        58, 147, PAGE_W - 116, NOTE,
    )
    draw_paragraph(
        pdf,
        "Equipment total includes machining and support equipment. Monthly output is a reference capacity and varies with part geometry, material, finishing and production mix.",
        58, 106, PAGE_W - 116, NOTE,
    )
    pdf.showPage()

    # Page 2: ordering, inspection and export requirements.
    pdf.setFillColor(PALE)
    pdf.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    draw_header(pdf, "Project planning and inspection", 2)
    pdf.setFillColor(INK)
    pdf.setFont("LZZSans-Bold", 29)
    pdf.drawString(50, PAGE_H - 146, "From drawing to delivery")
    draw_paragraph(
        pdf,
        "Orders start at 1 piece. Production takes 7-14 business days after drawing and order confirmation, including surface finishing; transit is additional. The quotation confirms price, acceptance and shipping details.",
        52, PAGE_H - 163, PAGE_W - 104, BODY,
    )

    steps = [
        ("01", "Share the part", "Send the drawing or sample, revision, quantity and intended use."),
        ("02", "Review the details", "Identify critical features, material, finish and inspection records."),
        ("03", "Confirm the quote", "Agree price, inspection records, shipping scope and terms."),
        ("04", "Make and inspect", "Plan sample, in-process and final checks to the agreed criteria."),
        ("05", "Approve and ship", "Confirm packing, documents, destination and dispatch plan."),
    ]
    card_y, card_h = PAGE_H - 338, 136
    gap = 12
    card_w = (PAGE_W - 100 - gap * 4) / 5
    for index, (number, title, body) in enumerate(steps):
        x = 50 + index * (card_w + gap)
        pdf.setFillColor(WHITE)
        pdf.roundRect(x, card_y, card_w, card_h, 7, stroke=0, fill=1)
        pdf.setFillColor(RED)
        pdf.roundRect(x + 14, card_y + card_h - 34, 28, 22, 4, stroke=0, fill=1)
        pdf.setFillColor(WHITE)
        pdf.setFont("LZZSans-Bold", 8)
        pdf.drawCentredString(x + 28, card_y + card_h - 27, number)
        draw_paragraph(pdf, title, x + 14, card_y + card_h - 51, card_w - 28,
                       ParagraphStyle("step-title", fontName="LZZSans-Bold", fontSize=12, leading=15, textColor=INK))
        draw_paragraph(pdf, body, x + 14, card_y + card_h - 89, card_w - 28, CARD)

    # Lower-left information column.
    section_heading(pdf, "Materials, finish and export details", 50, 430, 14)
    y = draw_paragraph(
        pdf,
        "Material examples in the brochure: aluminum 6061/7075/2024; stainless steel 304/316/17-4PH; copper/brass C3600/H62; plastics POM/PEEK/PPSU; titanium, Inconel, Kovar and Invar. Specify the exact grade and condition, then confirm availability and required material documents. The brochure's C3600 designation needs confirmation against the requested standard; the list does not establish stock availability or suitability for every part.",
        51, 406, 520, BODY_SMALL,
    ) - 15
    y = draw_paragraph(
        pdf,
        "State the required finish standard and revision, masked areas, cosmetic faces and dimensions that apply after treatment. For export orders, provide the destination and required arrival date; confirm dispatch date, carrier or freight method, Incoterm, customs, duties and taxes in the quotation. Transit time is separate from production time.",
        51, y, 520, BODY_SMALL,
    ) - 17
    section_heading(pdf, "Include these details in your RFQ", 50, y - 2, 14)
    y -= 28
    for text in (
        "Drawing or model with revision and critical dimensions",
        "Quantity by part number and expected repeat demand, if known",
        "Material grade, finish standard and required documentation",
        "Inspection method, sample plan and report format",
        "Needed-by date, destination and shipping terms",
    ):
        y = draw_bullet(pdf, text, 52, y, 520, NOTE) - 5

    # Lower-right inspection scene and careful tolerance language.
    pdf.drawImage(str(INSPECTION_IMAGE), 798, 210, width=330, height=220,
                  preserveAspectRatio=True, anchor="c", mask="auto")
    # Internal provenance: inspection asset is AI-generated, not LZZ staff, measurement results or calibration records.
    section_heading(pdf, "Inspection and feature-specific tolerances", 648, 170, 14)
    draw_paragraph(
        pdf,
        "Specify datums and critical features on the controlled drawing. Agree the measurement method, sampling and reports. "
        "A tolerance of ±0.01 mm may be considered for selected features after engineering review; feasibility depends on material, setup and measurement method. "
        "This is not a general tolerance or guarantee. Confirm instrument range and current calibration documentation, with the inspection records available for your order.",
        649, 147, 480, BODY_SMALL,
    )

    pdf.setFillColor(INK)
    pdf.rect(0, 0, PAGE_W, 58, stroke=0, fill=1)
    pdf.setFillColor(WHITE)
    pdf.setFont("LZZSans-Bold", 10)
    pdf.drawString(50, 35, "Send drawings for a quotation")
    pdf.setFont("LZZSans", 9)
    pdf.drawString(50, 18, "roger@lzz-cnc.com  |  WhatsApp: +86 138 5810 2479  |  No. 4 Fengcheng Road, Pingyao Town, Yuhang District, Hangzhou, Zhejiang, China")
    pdf.linkURL("mailto:roger@lzz-cnc.com", (48, 11, 255, 46), relative=0)
    pdf.linkURL("https://www.lzz-cnc.com/quote/", (PAGE_W - 280, 12, PAGE_W - 48, 47), relative=0)
    pdf.setFillColor(WHITE)
    pdf.setFont("LZZSans-Bold", 9)
    pdf.drawRightString(PAGE_W - 50, 35, "www.lzz-cnc.com/quote/")

    pdf.save()
    print(f"Created {OUTPUT}")


if __name__ == "__main__":
    main()
