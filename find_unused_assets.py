import os
import re
from pathlib import Path

PROJECT_ROOT = Path(".")
ASSETS_DIR = PROJECT_ROOT / "src" / "assets"

CODE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"]
ASSET_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4", ".svg"]

EXCLUDE_DIRS = {"node_modules", "dist", ".git"}

IMPORT_PATTERN = re.compile(r"""from\s+['"](.*?assets/.*?\.(png|jpg|jpeg|webp|gif|mp4|svg))['"]""")

used_assets = set()

print("Scanning source files...")

for root, dirs, files in os.walk(PROJECT_ROOT):
    # 🚫 Skip unwanted folders
    dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

    for file in files:
        if any(file.endswith(ext) for ext in CODE_EXTENSIONS):
            filepath = Path(root) / file
            try:
                content = filepath.read_text(encoding="utf-8", errors="ignore")
                matches = IMPORT_PATTERN.findall(content)
                for match in matches:
                    asset_name = Path(match[0]).name
                    used_assets.add(asset_name)
            except Exception:
                pass

print("Scanning assets folder...")

all_assets = set(
    file.name
    for file in ASSETS_DIR.iterdir()
    if file.suffix.lower() in ASSET_EXTENSIONS
)

unused_assets = all_assets - used_assets

print("\n=== UNUSED ASSETS ===")
for asset in sorted(unused_assets):
    print(asset)

print(f"\nTotal unused: {len(unused_assets)}")
