"""Validate suite metadata, sibling references, and repository Markdown links."""
from pathlib import Path
import re
import sys
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
errors = []
skills = sorted((ROOT / 'skills').glob('*/SKILL.md'))
names = set()
for path in skills:
    text = path.read_text(encoding='utf-8')
    match = re.match(r'^---\nname: ([a-z0-9-]+)\ndescription: (.+)\n---\n', text)
    if not match:
        errors.append(f'{path.relative_to(ROOT)}: invalid frontmatter')
        continue
    name, description = match.groups()
    if name != path.parent.name or name in names or len(name) >= 64:
        errors.append(f'{path.relative_to(ROOT)}: inconsistent skill name')
    names.add(name)
    if not (path.parent / 'agents/openai.yaml').is_file():
        errors.append(f'{name}: missing UI metadata')
    if len(description) > 1024:
        errors.append(f'{name}: description too long')
if not skills:
    errors.append('No skills found')

files = list((ROOT / 'skills').rglob('*.md')) + list((ROOT / 'examples').rglob('*.md')) + list(ROOT.glob('*.md'))
for path in files:
    text = path.read_text(encoding='utf-8')
    for target in re.findall(r'\]\(([^)]+)\)', text):
        if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:', target) or target.startswith('#'):
            continue
        local = unquote(target.split('#')[0].split('?')[0])
        if local and not (path.parent / local).exists():
            errors.append(f'{path.relative_to(ROOT)}: missing link {target}')
if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'Validated {len(skills)} skills and local links in {len(files)} Markdown files.')
