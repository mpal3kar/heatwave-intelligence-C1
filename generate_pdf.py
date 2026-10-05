import os
import subprocess
import markdown

md_path = r"d:\Programming\Heatwave-MiniProject\COMPENDIUM.md"
html_out = r"d:\Programming\Heatwave-MiniProject\compendium-print.html"
pdf_out = r"d:\Programming\Heatwave-MiniProject\COMPENDIUM.pdf"

with open(md_path, "r", encoding="utf-8") as f:
    md_content = f.read()

# Convert markdown to html with tables and fenced_code extensions
html_body = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])

# Wrap in clean, print-optimized HTML styling
full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Climate Intelligence Heatwave Monitoring - Compendium</title>
    <style>
        @page {{
            size: A4;
            margin: 18mm 16mm;
        }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            color: #1e293b;
            line-height: 1.5;
            font-size: 11pt;
            margin: 0;
            padding: 0;
        }}
        h1 {{
            color: #c0392b;
            font-size: 20pt;
            border-bottom: 2px solid #ea580c;
            padding-bottom: 6px;
            margin-top: 18pt;
            margin-bottom: 10pt;
            page-break-after: avoid;
        }}
        h2 {{
            color: #1e293b;
            font-size: 14pt;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 4px;
            margin-top: 16pt;
            margin-bottom: 8pt;
            page-break-after: avoid;
        }}
        h3 {{
            color: #334155;
            font-size: 12pt;
            margin-top: 14pt;
            margin-bottom: 6pt;
            page-break-after: avoid;
        }}
        h4 {{
            color: #0f172a;
            font-size: 11pt;
            margin-top: 10pt;
            margin-bottom: 4pt;
            page-break-after: avoid;
        }}
        p {{
            margin: 0 0 8pt 0;
        }}
        hr {{
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 16pt 0;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 12pt 0;
            font-size: 10pt;
            page-break-inside: avoid;
        }}
        th, td {{
            border: 1px solid #cbd5e1;
            padding: 7px 10px;
            text-align: left;
        }}
        th {{
            background-color: #1e293b;
            color: #ffffff;
            font-weight: 600;
        }}
        tr:nth-child(even) {{
            background-color: #f8fafc;
        }}
        code {{
            font-family: Consolas, "Courier New", monospace;
            background-color: #f1f5f9;
            color: #c0392b;
            padding: 2px 4px;
            border-radius: 3px;
            font-size: 9.5pt;
        }}
        pre {{
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid #ea580c;
            padding: 10px 14px;
            border-radius: 4px;
            overflow-x: auto;
            font-size: 9pt;
            line-height: 1.4;
            margin: 10pt 0;
            page-break-inside: avoid;
        }}
        pre code {{
            background: none;
            padding: 0;
            color: #1e293b;
        }}
        ul, ol {{
            margin: 0 0 10pt 20pt;
            padding: 0;
        }}
        li {{
            margin-bottom: 4pt;
        }}
        .page-break {{
            page-break-before: always;
        }}
        /* Force page breaks before major parts */
        h1:has(+ h3:contains("Role")) {{
            page-break-before: always;
        }}
    </style>
</head>
<body>
{html_body}
</body>
</html>
"""

# Let's ensure headers for PART 1, PART 2, PART 3, PART 4 have page-break-before
for part in ["<h1>PART 1:", "<h1>PART 2:", "<h1>PART 3:", "<h1>PART 4:"]:
    full_html = full_html.replace(part, f'<div class="page-break"></div>{part}')

with open(html_out, "w", encoding="utf-8") as f:
    f.write(full_html)

print("compendium-print.html created")

# Generate PDF via Chrome headless
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
cmd = [
    chrome_path,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_out}",
    f"file:///{html_out.replace('\\', '/')}"
]

print("Running Chrome print-to-pdf...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Return code:", res.returncode)
if os.path.exists(pdf_out):
    print(f"PDF successfully generated: {pdf_out} ({os.path.getsize(pdf_out)} bytes)")
else:
    print("PDF generation failed. Stderr:", res.stderr)
