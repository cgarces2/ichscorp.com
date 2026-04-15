import zipfile
import xml.etree.ElementTree as ET
import sys
import os

def extract(path):
    z = zipfile.ZipFile(path)
    xml_content = z.read('word/document.xml')
    tree = ET.XML(xml_content)
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    paragraphs = []
    for p in tree.findall('.//w:p', ns):
        texts = [node.text for node in p.findall('.//w:t', ns) if node.text]
        if texts:
            paragraphs.append(''.join(texts))
    return '\n'.join(paragraphs)

directory = r'd:\ICHS'
with open('ichs_content.txt', 'w', encoding='utf-8') as f:
    for filename in ['ICHS Business Plan.docx', 'ICHS Pamphlet.docx', 'ICHS Hazmat Services .docx', 'ICHS Crating Services .docx', 'ICHS Service of Work - Compliance Project .docx']:
        path = os.path.join(directory, filename)
        if os.path.exists(path):
            f.write(f"--- {filename} ---\n")
            f.write(extract(path))
            f.write("\n\n")
