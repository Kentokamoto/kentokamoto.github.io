// enhanced-img imports with options, e.g. `photo.jpg?w=560;280&enhanced`
// (the package only declares the bare `*?enhanced` form).
declare module '*&enhanced' {
    import type { Picture } from '@sveltejs/enhanced-img'
    const value: Picture
    export default value
}
