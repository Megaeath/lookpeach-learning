import os
import json

subjects_dir = os.path.join(os.path.dirname(__file__), '../data/subjects')
manifest_path = os.path.join(subjects_dir, 'manifest.json')

def get_title_from_filename(filename):
    # Remove extension and replace underscores with spaces
    return os.path.splitext(filename)[0].replace('_', ' ')

def build_manifest():
    manifest = {}
    for subject in os.listdir(subjects_dir):
        subject_path = os.path.join(subjects_dir, subject)
        if os.path.isdir(subject_path):
            files = [f for f in os.listdir(subject_path) if f.endswith('.json')]
            manifest[subject] = [
                {"file": f, "title": get_title_from_filename(f)} for f in files
            ]
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print('Manifest updated:', manifest_path)

if __name__ == '__main__':
    build_manifest()
