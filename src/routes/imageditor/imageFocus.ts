import { FocusedImage, FocusPicker, Focus } from "image-focus"

// Instantiate our FocusPicker providing starting focus
// and onChange callback
// const focusPicker = new FocusPicker(focusPickerEl, {
//     focus,
//     onChange: (newFocus: Focus) => {
//       const x = newFocus.x.toFixed(2)
//       const y = newFocus.y.toFixed(2)
//       coordinates.value = `{x: ${x}, y: ${y}}`
//       dataAttributes.value = `data-focus-x="${x}" data-focus-y="${y}"`
//       focusedImages.forEach(focusedImage => focusedImage.setFocus(newFocus))
//     },
//   })


// // Add event listener for updating image sources
// imgSrcEl.addEventListener("input", () => {
//     focusPicker.img.src = imgSrcEl.value
//     focusedImages.forEach(focusedImage => (focusedImage.img.src = imgSrcEl.value))
//   })