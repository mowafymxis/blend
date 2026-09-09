"""Exercise fresh install, refusal, backup preservation, and transaction rollback."""
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch
import shutil
import install


with TemporaryDirectory() as tmp:
    root = Path(tmp).resolve()
    dest = root / 'skills'
    count, backup = install.install(dest)
    assert count == len(list((install.ROOT / 'skills').iterdir())) and backup is None
    (dest / 'blend' / 'user-note.txt').write_text('preserve me')
    try:
        install.install(dest)
    except ValueError:
        pass
    else:
        raise AssertionError('Existing installation should require --replace')
    assert (dest / 'blend/user-note.txt').read_text() == 'preserve me'
    count, backup = install.install(dest, True, root / 'backups')
    assert (backup / 'blend/user-note.txt').read_text() == 'preserve me'
    assert not (dest / 'blend/user-note.txt').exists()
    before = {str(p.relative_to(dest)): p.read_bytes() for p in dest.rglob('*') if p.is_file()}
    real_move = shutil.move
    attempts = 0
    def fail_once(source, target):
        global attempts
        if '.blend-stage-' in str(source):
            attempts += 1
            if attempts == 2:
                raise OSError('Simulated interrupted install')
        return real_move(source, target)
    with patch.object(install.shutil, 'move', side_effect=fail_once):
        try:
            install.install(dest, True, root / 'backups')
        except OSError:
            pass
        else:
            raise AssertionError('Failure injection did not run')
    after = {str(p.relative_to(dest)): p.read_bytes() for p in dest.rglob('*') if p.is_file()}
    assert before == after, 'Rollback did not preserve the installed suite'
    assert not list(dest.glob('.blend-stage-*'))
print('Install, refusal, backup, and rollback checks passed.')
