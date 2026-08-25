from PIL import Image, ImageOps

img = Image.open('calvras.png').convert('RGBA')
width, height = img.size
print(f"Original dimensions: {width}x{height}")

# Find bounding box of non-white pixels
# Convert to grayscale
gray = img.convert('L')
# Invert so content is white, background is black
inv = ImageOps.invert(gray)
# Threshold out near-white background
thresh = inv.point(lambda p: 255 if p > 30 else 0)
bbox = thresh.getbbox()
print(f"Content bbox: {bbox}")

# The top ~65% of the content bbox contains the icon emblem (the C with rays and star)
left, top, right, bottom = bbox
content_height = bottom - top

# Crop the emblem (top portion)
emblem_bottom = top + int(content_height * 0.65)
# Make it square
emblem_box = (left - 20, top - 20, right + 20, emblem_bottom + 20)
# Ensure square
e_width = emblem_box[2] - emblem_box[0]
e_height = emblem_box[3] - emblem_box[1]
size = max(e_width, e_height)
center_x = (emblem_box[0] + emblem_box[2]) // 2
center_y = (emblem_box[1] + emblem_box[3]) // 2

sq_box = (
    max(0, center_x - size // 2),
    max(0, center_y - size // 2),
    min(width, center_x + size // 2),
    min(height, center_y + size // 2)
)

icon_crop = img.crop(sq_box)

# Make pure black on transparent background
# Any pixel with brightness > 240 becomes transparent
datas = icon_crop.getdata()
new_data = []
for item in datas:
    # item is (R, G, B, A)
    brightness = (item[0] + item[1] + item[2]) // 3
    if brightness > 235:
        new_data.append((255, 255, 255, 0)) # transparent
    else:
        new_data.append((item[0], item[1], item[2], 255))

transparent_icon = Image.new("RGBA", icon_crop.size)
transparent_icon.putdata(new_data)

# Resize to standard icon sizes
icon_512 = transparent_icon.resize((512, 512), Image.Resampling.LANCZOS)
icon_192 = transparent_icon.resize((192, 192), Image.Resampling.LANCZOS)
icon_180 = transparent_icon.resize((180, 180), Image.Resampling.LANCZOS)
icon_64 = transparent_icon.resize((64, 64), Image.Resampling.LANCZOS)
icon_32 = transparent_icon.resize((32, 32), Image.Resampling.LANCZOS)
icon_16 = transparent_icon.resize((16, 16), Image.Resampling.LANCZOS)

# Save cropped icons
icon_512.save("public/icon-512.png")
icon_192.save("public/icon-192.png")
icon_180.save("public/apple-touch-icon.png")
icon_64.save("public/favicon.png")
icon_32.save("public/favicon-32x32.png")
icon_512.save("public/calvras-icon.png")
icon_512.save("src/assets/calvras-icon.png")

# Save favicon.ico with multi-sizes
icon_32.save("public/favicon.ico", format="ICO", sizes=[(16,16), (32,32), (48,48)])

# Crop the full logo (emblem + text) tightly
full_crop = img.crop((left - 30, top - 30, right + 30, bottom + 30))
full_crop.save("public/calvras-full.png")
full_crop.save("src/assets/calvras-full.png")

print("SUCCESS: Generated all cropped icons and full logo files!")
