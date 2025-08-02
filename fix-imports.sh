#!/bin/bash
echo "Fixing versioned imports in UI components..."

# Array of files to fix
files=(
  "components/ui/aspect-ratio.tsx"
  "components/ui/avatar.tsx"
  "components/ui/badge.tsx" 
  "components/ui/breadcrumb.tsx"
  "components/ui/calendar.tsx"
  "components/ui/carousel.tsx"
  "components/ui/chart.tsx"
  "components/ui/checkbox.tsx"
  "components/ui/collapsible.tsx"
  "components/ui/command.tsx"
  "components/ui/context-menu.tsx"
  "components/ui/dialog.tsx"
  "components/ui/drawer.tsx"
  "components/ui/dropdown-menu.tsx"
  "components/ui/form.tsx"
  "components/ui/hover-card.tsx"
  "components/ui/label.tsx"
  "components/ui/menubar.tsx"
  "components/ui/navigation-menu.tsx"
  "components/ui/pagination.tsx"
  "components/ui/popover.tsx"
  "components/ui/progress.tsx"
  "components/ui/radio-group.tsx"
  "components/ui/resizable.tsx"
  "components/ui/scroll-area.tsx"
  "components/ui/select.tsx"
  "components/ui/separator.tsx"
  "components/ui/sidebar.tsx"
  "components/ui/slider.tsx"
  "components/ui/sonner.tsx"
  "components/ui/switch.tsx"
  "components/ui/tabs.tsx"
  "components/ui/toggle-group.tsx"
  "components/ui/toggle.tsx"
  "components/ui/tooltip.tsx"
)

# Function to remove version numbers from imports
fix_imports() {
  local file=$1
  echo "Fixing $file..."
  
  # Remove version numbers from all @radix-ui imports
  sed -i.bak 's/@radix-ui\/react-[a-z-]*@[0-9.]*/@radix-ui\/react-\1/g' "$file"
  
  # Fix specific patterns
  sed -i.bak 's/@radix-ui\/react-accordion@[0-9.]*/@radix-ui\/react-accordion/g' "$file"
  sed -i.bak 's/@radix-ui\/react-alert-dialog@[0-9.]*/@radix-ui\/react-alert-dialog/g' "$file"
  sed -i.bak 's/@radix-ui\/react-aspect-ratio@[0-9.]*/@radix-ui\/react-aspect-ratio/g' "$file"
  sed -i.bak 's/@radix-ui\/react-avatar@[0-9.]*/@radix-ui\/react-avatar/g' "$file"
  sed -i.bak 's/@radix-ui\/react-checkbox@[0-9.]*/@radix-ui\/react-checkbox/g' "$file"
  sed -i.bak 's/@radix-ui\/react-collapsible@[0-9.]*/@radix-ui\/react-collapsible/g' "$file"
  sed -i.bak 's/@radix-ui\/react-context-menu@[0-9.]*/@radix-ui\/react-context-menu/g' "$file"
  sed -i.bak 's/@radix-ui\/react-dialog@[0-9.]*/@radix-ui\/react-dialog/g' "$file"
  sed -i.bak 's/@radix-ui\/react-dropdown-menu@[0-9.]*/@radix-ui\/react-dropdown-menu/g' "$file"
  sed -i.bak 's/@radix-ui\/react-hover-card@[0-9.]*/@radix-ui\/react-hover-card/g' "$file"
  sed -i.bak 's/@radix-ui\/react-label@[0-9.]*/@radix-ui\/react-label/g' "$file"
  sed -i.bak 's/@radix-ui\/react-menubar@[0-9.]*/@radix-ui\/react-menubar/g' "$file"
  sed -i.bak 's/@radix-ui\/react-navigation-menu@[0-9.]*/@radix-ui\/react-navigation-menu/g' "$file"
  sed -i.bak 's/@radix-ui\/react-popover@[0-9.]*/@radix-ui\/react-popover/g' "$file"
  sed -i.bak 's/@radix-ui\/react-progress@[0-9.]*/@radix-ui\/react-progress/g' "$file"
  sed -i.bak 's/@radix-ui\/react-radio-group@[0-9.]*/@radix-ui\/react-radio-group/g' "$file"
  sed -i.bak 's/@radix-ui\/react-scroll-area@[0-9.]*/@radix-ui\/react-scroll-area/g' "$file"
  sed -i.bak 's/@radix-ui\/react-select@[0-9.]*/@radix-ui\/react-select/g' "$file"
  sed -i.bak 's/@radix-ui\/react-separator@[0-9.]*/@radix-ui\/react-separator/g' "$file"
  sed -i.bak 's/@radix-ui\/react-slot@[0-9.]*/@radix-ui\/react-slot/g' "$file"
  sed -i.bak 's/@radix-ui\/react-slider@[0-9.]*/@radix-ui\/react-slider/g' "$file"
  sed -i.bak 's/@radix-ui\/react-switch@[0-9.]*/@radix-ui\/react-switch/g' "$file"
  sed -i.bak 's/@radix-ui\/react-tabs@[0-9.]*/@radix-ui\/react-tabs/g' "$file"
  sed -i.bak 's/@radix-ui\/react-toggle@[0-9.]*/@radix-ui\/react-toggle/g' "$file"
  sed -i.bak 's/@radix-ui\/react-toggle-group@[0-9.]*/@radix-ui\/react-toggle-group/g' "$file"
  sed -i.bak 's/@radix-ui\/react-tooltip@[0-9.]*/@radix-ui\/react-tooltip/g' "$file"
  
  # Fix other package versions
  sed -i.bak 's/lucide-react@[0-9.]*"/lucide-react"/g' "$file"
  sed -i.bak 's/class-variance-authority@[0-9.]*"/class-variance-authority"/g' "$file"
  sed -i.bak 's/react-day-picker@[0-9.]*"/react-day-picker"/g' "$file"
  sed -i.bak 's/embla-carousel-react@[0-9.]*"/embla-carousel-react"/g' "$file"
  sed -i.bak 's/recharts@[0-9.]*"/recharts"/g' "$file"
  sed -i.bak 's/cmdk@[0-9.]*"/cmdk"/g' "$file"
  sed -i.bak 's/vaul@[0-9.]*"/vaul"/g' "$file"
  sed -i.bak 's/react-resizable-panels@[0-9.]*"/react-resizable-panels"/g' "$file"
  sed -i.bak 's/next-themes@[0-9.]*"/next-themes"/g' "$file"
  sed -i.bak 's/sonner@[0-9.]*"/sonner"/g' "$file"
  sed -i.bak 's/react-hook-form@[0-9.]*"/react-hook-form"/g' "$file"
  
  # Remove backup files
  rm -f "$file.bak"
}

# Fix all files
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    fix_imports "$file"
  else
    echo "File not found: $file"
  fi
done

echo "Import fixing complete!"