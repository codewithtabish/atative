// IMPORTANT ATATIVE LAYOUT RULE:

// My page/layout is already wrapped by a global <Container /> component that handles all page-level horizontal spacing, padding, centering, and maximum width.

// Therefore:

// - DO NOT add page-level horizontal padding such as:
//   px-4
//   px-5
//   px-6
//   px-8
//   px-10
//   px-12
//   sm:px-*
//   md:px-*
//   lg:px-*
//   xl:px-*
//   2xl:px-*

// - DO NOT create another general-purpose page container with its own horizontal padding.

// - Assume the component you are creating is already inside my global Container.

// - Let the parent Container control the page's horizontal boundaries.

// - Children should focus only on their own:
//   - layout
//   - grid/flex structure
//   - gaps
//   - margins
//   - vertical spacing
//   - typography
//   - borders
//   - backgrounds
//   - cards
//   - responsive layout
//   - max-width where appropriate

// - You MAY use max-w-* on a child when intentionally controlling the reading/content width.
//   Example:
//   max-w-2xl
//   max-w-3xl
//   max-w-4xl
//   max-w-6xl

// - You MAY use mx-auto when centering a child with an intentional max-width.

// - Do NOT use max-w-* + px-* just to recreate the global page container.

// - If a specific inner component genuinely needs additional horizontal inset for design reasons, add it only locally and intentionally, not as general page spacing.

// Example:

// <Container>
//   <HomePage />
// </Container>

// Inside HomePage, assume the Container already provides the page padding.

// GOOD:

// <section className="py-16">
//   <div className="grid gap-8 lg:grid-cols-12">
//     ...
//   </div>
// </section>

// GOOD:

// <article className="mx-auto w-full max-w-4xl">
//   ...
// </article>

// BAD:

// <section className="px-4 sm:px-6 lg:px-8 py-16">
//   ...
// </section>

// BAD:

// <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//   ...
// </div>

// The goal is to avoid duplicated horizontal spacing and keep the entire ATATIVE UI structurally consistent.

// Always assume the global Container exists unless I explicitly tell you that the component is rendered outside it.
