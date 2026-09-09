"""Install the complete Blend suite, backing up explicitly replaced folders."""
import argparse
import os
from pathlib import Path
import shutil
import tempfile
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]


def install(destination, replace=False, backup_dir=None):
    destination = Path(destination).expanduser().resolve()
    sources = sorted((ROOT / 'skills').iterdir())
    if not sources or any(not (p / 'SKILL.md').is_file() for p in sources):
        raise ValueError('Expected complete skill folders under skills/.')
    destination.mkdir(parents=True, exist_ok=True)
    targets = [destination / p.name for p in sources]
    for target in targets:
        if target.is_symlink() or target.resolve().parent != destination:
            raise ValueError(f'Unsafe install target: {target}')
        if target.exists() and not target.is_dir():
            raise ValueError(f'Install target is not a directory: {target}')
        if target.resolve() == ROOT or ROOT.is_relative_to(target.resolve()):
            raise ValueError('Destination overlaps the source repository.')
        if target.resolve().is_relative_to((ROOT / 'skills').resolve()):
            raise ValueError('Destination overlaps the source skills.')
    existing = [p for p in targets if p.exists()]
    if existing and not replace:
        raise ValueError('Already installed: ' + ', '.join(p.name for p in existing)
                         + '. Use --replace to back up and replace these folders.')
    backup = None
    if existing:
        base = Path(backup_dir or ROOT / '.maintainer' / 'install-backups').expanduser().resolve()
        if any(base == p.resolve() or base.is_relative_to(p.resolve()) for p in targets):
            raise ValueError('Backup directory must be outside installed skill folders.')
        base.mkdir(parents=True, exist_ok=True)
        backup = Path(tempfile.mkdtemp(prefix=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ-'), dir=base))
    staged = Path(tempfile.mkdtemp(prefix='.blend-stage-', dir=destination))
    completed, moved = [], []
    try:
        for source in sources:
            shutil.copytree(source, staged / source.name)
            for notice in ('LICENSE', 'THIRD_PARTY_NOTICES.md'):
                shutil.copy2(ROOT / notice, staged / source.name / notice)
        for target in targets:
            if target.exists():
                shutil.move(str(target), str(backup / target.name))
                moved.append(target)
            shutil.move(str(staged / target.name), str(target))
            completed.append(target)
    except Exception:
        # Targets were checked above; only this transaction's new copies are removed.
        for target in reversed(completed):
            if target.resolve().parent != destination:
                raise RuntimeError('Install target changed during rollback.')
            shutil.rmtree(target)
        for target in reversed(moved):
            shutil.move(str(backup / target.name), str(target))
        raise
    finally:
        if staged.resolve().parent != destination:
            raise RuntimeError('Staging path changed during installation.')
        shutil.rmtree(staged)
    return len(targets), backup


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    default = Path(os.environ.get('CODEX_HOME', Path.home() / '.codex')) / 'skills'
    parser.add_argument('--dest', type=Path, default=default)
    parser.add_argument('--replace', action='store_true')
    parser.add_argument('--backup-dir', type=Path)
    args = parser.parse_args()
    try:
        count, backup = install(args.dest, args.replace, args.backup_dir)
    except (ValueError, OSError) as error:
        parser.exit(1, f'{error}\n')
    print(f'Installed {count} skills in {args.dest.expanduser().resolve()}')
    if backup:
        print(f'Previous folders retained in {backup}')


if __name__ == '__main__':
    main()
