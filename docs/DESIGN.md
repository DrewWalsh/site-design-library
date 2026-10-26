# Site Design Library Design Document

**Repository:** `site-design-library`  
**Version:** 1.0  
**Date:** 26 October 2026  
**Status:** Specification for implementation. The fifty references below are proposed designs; their live specimens and screenshots are deliverables of the build.

## Purpose and outcome

Build a repository of fifty deliberately different website design directions. Each direction combines a working miniature site, a written design rationale, reusable visual tokens, reference screenshots, and instructions for adapting it to another project. The library should make it possible to tell a coding agent, “Use 27 Blueprint Studio for this architecture portfolio,” and receive a coherent interpretation of that design rather than a generic template with a different colour.

The collection must cover ordinary, dependable websites as thoroughly as playful and experimental work. A service page, an editorial publication, a shop, a research interface, a working dashboard, and an artist's portfolio should have appropriate references. Some designs will prioritise clarity and speed; others will prioritise atmosphere, discovery, material character, or spectacle. Those priorities must be visible in composition and behaviour.

The deliverable is a reference library with bounded demonstrations. Each specimen proves its central layout and interaction through a small, complete user journey. Its code and documentation should be easy to inspect and adapt. Authentication, payments, production databases, and complete business applications are outside the first release.

### What success looks like

A person can browse the collection visually, find a suitable direction, compare it with another, and copy a useful instruction for a coding agent. An agent can search the catalogue as text, open the selected design's rules and screenshots, inspect its source, and apply its principles while respecting the destination project's architecture. Each finished reference looks recognisable on both a large monitor and a phone.

Fifty entries is the final scope. Delivery proceeds in batches, with visible status for every entry. An entry becomes ready only when its specimen, documentation, reference images, and basic checks agree.

## Design principles

### Difference must survive a palette change

Treat the following as independent design decisions: composition, navigation, typography, information density, imagery, surface treatment, and interaction. Each design must differ meaningfully from its closest neighbour on at least three of these dimensions. At least one difference must concern composition or navigation. This is an editorial acceptance rule for this collection, not a numerical measure of artistic quality.

Changing only colours, fonts, corner radii, or the industry named in the copy does not create another design. The library must include lists, tables, maps, document spreads, panels, timelines, flowing text, dramatic posters, spatial arrangements, and guided sequences. Cards are appropriate where the concept calls for cards.

### Build around real content and a real task

Each design gets a fictional brand or publication and content appropriate to its purpose. Include credible titles, variable text lengths, meaningful imagery or diagrams, and enough records to reveal density. The content must expose the design's strengths and constraints. Label invented business facts and sample data in the reference documentation; no demonstration should quietly present fictional research as established fact.

Homepages are only one context. Every specimen must demonstrate a primary task and at least two supporting contexts or states. These can be separate pages, a detail view, a validation state, a filtered result, an expanded annotation, or a confirmation. Choose states that belong to the concept; a reading site does not need a pretend account system.

### Share behaviour carefully and appearance deliberately

Share practical infrastructure such as routing, fixture helpers, focus management, and screenshot capture. Accessible interaction primitives may be shared without a prescribed appearance. Each design owns its page composition, typography, colours, rhythm, component surfaces, and visual navigation. Avoid a universal hero, header, card, button, or footer that makes the whole library look like one product.

### Preserve the design under ordinary constraints

Mobile layouts are designed, not merely shrunk. Long text, zoom, focus, empty results, and reduced motion must leave the experience understandable. A retro reference uses modern HTML and input behaviour. An experimental reference must have a clear way to reach its content without mastering an unusual gesture. Accessibility and performance form the construction standard across the collection; they do not dictate one visual style.

## Reference package for each design

Every ready design includes the following material. Optional files are added only when the specimen actually needs them.

| Deliverable | Required contents |
| --- | --- |
| `design.json` | Stable ID, name, slug, family, design thesis, suitable uses, design traits, effort, status, entry route, important states, and reference paths. |
| `DESIGN.md` | Purpose, page anatomy, content model, typography, spacing, palette roles, interaction, mobile behaviour, defining features, adaptation guidance, and nearest neighbours. |
| `tokens.css` | Role based custom properties for colour, type, spacing, widths, borders, depth, and motion where applicable. Values must match the specimen. |
| Specimen source | One entry component and only the supporting components and fixtures needed for its bounded journey. |
| Reference images | A desktop entry view, a mobile entry view, and one useful inner page or interaction state. Add a full page image only when it explains more than the entry view. |
| Asset record | Font and image sources, author or owner where applicable, usage terms, local paths, and attribution requirements. |
| Verification record | What was checked, remaining limitations, and the specimen revision used for the captured references. |

The written brief must distinguish **defining features**, which keep the design recognisable, from **adaptable choices**, such as brand colour, content category, and a suitable equivalent typeface. It must also name common mistakes that destroy the concept. A precise sentence such as “Keep the numbered project rail and drawing plate hierarchy” is more useful than “Make it sophisticated.”

### Required visual specifications

Document a heading face and a reading face or a deliberate single family system. Select fonts available to the project, bundle permitted fonts locally, and record fallbacks and licensing. Name actual families during implementation; do not make the design depend on an unavailable commercial font.

Define palette roles before picking exact values: page, surface, primary text, secondary text, accent, border, and status colours when needed. Decorative colours can be freer than reading colours. Record the spacing rhythm, reading measure, container behaviour, and approach to imagery. Each reference should explain what it does with a second screenful of content.

Motion needs a purpose, trigger, endpoint, and reduced motion treatment. Most references need little motion. For motion centred references, the resting composition must still be strong and all content must remain reachable when the movement is disabled.

## Gallery and inspection experience

The library itself should use a quiet, neutral interface that puts the specimens first. Give each entry a real screenshot, ID, name, short thesis, likely uses, and implementation status. Planned entries may show a labelled text card; they must not display invented screenshots or imply a working demo exists.

Support text search and a small set of filters: purpose, family, restrained or expressive character, information density, motion, and effort. Put filter state in the URL. Keep a clear reset action and a useful empty result. A generated JSON catalogue is sufficient for search; the first release does not need a database, embeddings, or an AI recommendation service.

### Routes and controls

| Surface | Route contract | Behaviour |
| --- | --- | --- |
| Catalogue | `/` | Search, filter, sort by ID or name, and open an entry. |
| Design inspector | `/designs/01-civic-service` | Read the brief, inspect reference images, open the live specimen, and copy its reference prompt. |
| Standalone specimen | `/preview/01-civic-service/start` | Run the example without the gallery's visual navigation. Supporting states have deep links where sensible. |
| Comparison | `/compare?ids=01,27` | Compare two references at matching viewport sizes, with their key principles visible. Stack them or switch between them on a phone. |

The inspector provides desktop and phone viewport presets, plus an ordinary resizable preview. Run the specimen inside a titled iframe so its document and global styling are separate from the gallery. Include “Open full preview” for normal browser use. Preview framing is gallery tooling and must not appear in specimen screenshots or copied layouts.

Show a comparison of two designs' composition, navigation, density, and interaction alongside their screenshots. Avoid declaring one “best”; suitability depends on the project. Useful neighbours and contrasts belong in each design's brief.

The copy action produces a short instruction containing the repository path or remote location, design ID, relevant brief and source paths, three defining traits, the intended scope, and any chosen secondary influence. The same information must be available as selectable text if clipboard access fails.

## Repository and implementation architecture

### Default stack

Use **Vue 3, TypeScript, and Vite**, matching Drew's usual frontend work while keeping the library easy to run as a static project. Use ordinary CSS, custom properties, and component scoped styles. Tailwind may support the gallery if desired; it must not impose a shared visual vocabulary or reset on every specimen. Keep versions pinned in a lockfile after checking the current official installation guidance at build time.

Use one repository, one package manifest, and one Vite project with gallery and preview entries. Use local fixtures and component state for demonstrations. Persist only useful local preferences or explicit demo actions, with a reset control and a namespace per design. The first release has no server requirement. A static host can be added once local use works. Configure gallery routes to resolve to the gallery entry and `/preview/` routes to the preview entry so direct links and refreshes load the right document.

Vite's dynamic imports can load a selected specimen on demand; do not import all design CSS, fonts, images, and interaction libraries at startup. Vue's scoped styles help keep component rules local, but document inheritance and child roots still require care. Use a separate preview entry within the same Vite project that imports no gallery reset, theme, or fonts. Scope tokens to the design root, load only its styles, and reload the preview document when changing designs so old global rules cannot remain active. The iframe alone does not prevent a shared application entry from importing gallery CSS. [S4] [S5]

### Proposed repository contents

| Path | Responsibility |
| --- | --- |
| `README.md` | Install, run, browse, and use the library from another project. |
| `AGENTS.md` | Short instructions for selecting, inspecting, and adapting references. |
| `docs/DESIGN.md` | This implementation specification and the fifty design briefs. |
| `docs/agent-workflow.md` | The selection and adaptation process, with example prompts. |
| `src/gallery/` | Catalogue, inspector, and comparison interface. |
| `src/preview/` and `preview.html` | Minimal specimen entry, with no gallery visual styles. |
| `src/designs/<id>-<slug>/` | One independent specimen and its reference package. |
| `src/shared/` | Behaviour or infrastructure with a clear shared need; no universal visual template. |
| `public/previews/<id>/` | Captured reference images and their capture metadata. |
| `scripts/build-catalogue.ts` | Validate entry metadata and generate the searchable catalogue. |
| `scripts/capture-previews.ts` | Capture the declared, deterministic specimen states. |
| `catalogue.json` | Generated, machine readable index for agents and gallery search. |

Inside a design folder, start with `design.json`, `DESIGN.md`, `tokens.css`, and `Demo.vue`. Add `fixtures.ts`, `components/`, and `assets/` when warranted. Small reading specimens may keep their content directly in a document or component. Attribution and verification can be sections of `DESIGN.md`; use separate files only when clearer. Keep a design's source readable without navigating a shared framework of elaborate abstractions.

### Metadata contract

Use a small schema that captures actual selection criteria. Every design has one canonical metadata record; the gallery index is generated from those records. The following example is deliberately marked planned because the specimen has not yet been built.

```json
{
  "schemaVersion": 1,
  "id": "01",
  "slug": "civic-service",
  "name": "Civic Service",
  "family": "clarity-and-editorial",
  "status": "planned",
  "thesis": "Help a visitor complete a concrete public service task with minimal uncertainty.",
  "suitableFor": ["public services", "applications", "support"],
  "traits": {
    "composition": "single-column task sequence",
    "navigation": "service index and explicit back links",
    "typography": "plain humanist sans",
    "density": "medium",
    "imagery": "instructional only",
    "surface": "flat with restrained rules",
    "motion": "minimal"
  },
  "effort": "low",
  "definingFeatures": [
    "Task language determines headings",
    "Prerequisites appear before the start action",
    "Answers and errors remain easy to review"
  ],
  "adaptableChoices": ["brand colour", "service content", "typeface equivalent"],
  "entryRoute": null,
  "states": [],
  "referenceImages": []
}
```

Use `planned`, `prototype`, `ready`, and `needs-review` as statuses. Add route, state, capture, and source revision data only when they exist. An image record should identify its file, route, viewport, state or fixture, and the source revision represented. When the relevant source changes, recapture or flag that image for review. IDs remain stable after publication; a renamed design keeps its ID and documented former slug.

The validator should catch missing required fields, duplicate IDs and slugs, broken declared paths, and ready entries with missing references. It should not try to assign aesthetic quality a synthetic score.

## The fifty designs

The catalogue contains original implementation briefs inspired by broad design traditions. The historical labels identify a direction, not a claim of exact historical reconstruction. The fictional specimens are proposed content, not existing products. Palette descriptions express roles and atmosphere; exact colours and contrast are resolved when building.

Effort is relative to the other bounded specimens: **low** is mostly layout and ordinary controls; **medium** adds richer composition or coordinated local state; **high** adds an interaction that needs a substantive fallback or more careful responsive work. These are planning judgements, not time estimates.

### Clarity and editorial designs 01 to 10

#### 01 Civic Service

**Philosophy and fit.** Make a necessary task easy to understand and finish. Suitable for municipal services, public guidance, support centres, and practical organisations whose visitors arrive with a specific question.

**Visual grammar.** A compact wordmark bar leads into breadcrumbs, a plain page title, an explanatory summary, and one dominant reading column. A secondary contents rail appears only on long guidance pages. Use a humanist sans, strong headings, square controls, white backgrounds, dark navy text, and restrained green action emphasis. Show eligibility and required documents before the action.

**Specimen and flow.** *Northbank Council* demonstrates finding a bulky waste collection service, checking requirements, and choosing a collection slot from local fixtures. Supporting states show an unavailable address and a confirmation page containing a reference and next steps.

**Adaptation and identity.** Mobile retains the same reading order and puts the contents list above the article. Preserve explicit labels, plain language, and task hierarchy; avoid decorative hero photography, ornamental cards, and surprise navigation. Motion is unnecessary. **Effort: low.**

#### 02 Precision SaaS

**Philosophy and fit.** Explain a software product through concrete capabilities, evidence, and a credible path into its interface. Suitable for subscription software, professional tools, and product launches needing a conventional commercial structure.

**Visual grammar.** Use a tidy horizontal navigation, asymmetric hero with product copy beside a real interface preview, alternating capability sections, a compact comparison table, and a direct closing action. A neutral grotesk, pale grey surfaces, charcoal text, and a single blue accent establish order. Reserve rounded containers for genuine interface groupings; screenshots should show readable features, not floating abstract rectangles.

**Specimen and flow.** *RelayDesk* presents a small client request tracker. Visitors inspect a worked request, compare three fictional plans, then open an interactive sample inbox. Supporting states include a populated request detail and an empty workspace with a useful first action.

**Adaptation and identity.** Mobile promotes copy before the preview and presents plan differences as labelled sections. Preserve capability-led storytelling and visible product evidence; avoid generic metric claims, gradient decoration, and autoplay demos. **Effort: medium.**

#### 03 Swiss Grid

**Philosophy and fit.** Build hierarchy through alignment, scale, and disciplined contrast. Suitable for conferences, studios, exhibitions, and editorial brands that want typography to carry their identity.

**Visual grammar.** Use a visibly rigorous grid, left-aligned oversized headings, numbered sections, generous outer margins, and restrained image crops. Small labels align with large type rather than floating in pills. A neutral sans works across a severe size range. An off-white ground, near-black text, and one vermilion accent organise the composition. Navigation is a short indexed list; rules and whitespace divide material instead of card backgrounds.

**Specimen and flow.** *Form Conference* lets visitors inspect the programme, filter sessions by day, and open a speaker profile. Supporting screens provide a programme detail with venue information and a saved-session list held locally.

**Adaptation and identity.** On mobile, preserve alignment relationships while reducing the number of columns; the oversized heading must wrap deliberately. Preserve the grid and typographic hierarchy; avoid symmetric feature tiles, decorative shapes, and unrelated typefaces. Motion is limited to quiet state changes. **Effort: low.**

#### 04 Quiet Atelier

**Philosophy and fit.** Let a small selection of work convey confidence through space and restraint. Suitable for independent designers, photographers, craftspeople, and small professional practices with strong visual portfolios.

**Visual grammar.** The opening view pairs a short introduction with one carefully positioned image, followed by a staggered sequence of selected projects. Use a modest text navigation and an index rather than a persistent sidebar. Warm white, brown-black ink, muted clay accents, a refined serif heading, and a small neutral sans create a subdued rhythm. Avoid treating every project as an identically sized tile.

**Specimen and flow.** *Alder Studio* presents furniture and interiors. Visitors choose a project, move through its image-and-caption sequence, and open an enquiry form prefilled with that project. Supporting states show the complete project index and locally validated enquiry feedback.

**Adaptation and identity.** Mobile converts the staggered composition into an intentional image sequence with captions directly beneath each image. Preserve selective curation, spaciousness, and material imagery; avoid enormous empty areas, hidden contact information, and compulsory animation. **Effort: low.**

#### 05 Scholarly Folio

**Philosophy and fit.** Support close reading while keeping commentary and sources within reach. Suitable for annotated texts, research essays, translations, archival editions, and educational publications.

**Visual grammar.** A book-like serif reading column sits between a narrow chapter index and a wider annotation margin. Use parchment-white, dark brown-black text, restrained burgundy links, paragraph numbers, and precise footnote markers. The title treatment resembles a scholarly title page. Notes are connected to passages through labels and alignment rather than colour alone; the navigation distinguishes chapters, annotations, and bibliography.

**Specimen and flow.** *The Commonplace Edition* contains an original fictional essay with author commentary. Selecting an annotation highlights its passage and reveals the note. Supporting views show the bibliography with source metadata and a reading-only mode that suppresses secondary material.

**Adaptation and identity.** Mobile brings each opened note into the reading flow with a clear return control. Preserve the relationship between text, notes, and sources; avoid magazine teasers, decorative manuscript imitation, and hover-only notes. Motion is unnecessary. **Effort: medium.**

#### 06 Editorial Newspaper

**Philosophy and fit.** Communicate editorial judgement across many stories at once. Suitable for newsrooms, city publications, trade journals, and frequently updated magazines.

**Visual grammar.** A strong masthead, date line, section navigation, lead story, secondary columns, and compact briefs create an unmistakable front page. Use assertive serif headlines, readable body text, small sans metadata, warm white, near-black ink, thin dividing rules, and restrained red alerts. Image scale indicates editorial priority. Stories share a typographic system without being enclosed in repetitive cards.

**Specimen and flow.** *The Northbank Record* offers fictional local reporting. Visitors browse the front page, switch section, and open a feature with related coverage. Supporting states include a search results page and a saved-reading list with a clear empty state.

**Adaptation and identity.** Mobile keeps the lead hierarchy and orders secondary stories explicitly rather than stacking desktop columns blindly. Preserve visible editorial ranking, meaningful sections, and useful metadata; avoid infinite feeds, identical story weights, and a hero that consumes the whole opening screen. **Effort: medium.**

#### 07 Literary Review

**Philosophy and fit.** Treat sustained reading as the main event. Suitable for essays, criticism, literary magazines, personal publications, and thoughtful cultural commentary.

**Visual grammar.** An understated masthead opens into a current issue with one lead essay and a sparse textual contents list. Article pages use a generous book serif, a measured line length, clear paragraph rhythm, restrained drop capitals, and ample separation around section changes. Use ivory, charcoal, and muted forest accents. Navigation follows issues, authors, and subjects; small illustrations may punctuate reading without becoming the interface.

**Specimen and flow.** *The Long Afternoon* lets visitors browse an issue, open an essay, and continue to the next essay through a deliberate end-of-article link. Supporting views include an author page and a reader preference panel for text size and line spacing.

**Adaptation and identity.** Mobile protects reading width and keeps preferences simple. Preserve the cadence of essays and the identity of each issue; avoid scholarly annotation rails, news urgency, autoplay media, and constant related-content interruptions. **Effort: low.**

#### 08 Documentary Story

**Philosophy and fit.** Build understanding through a deliberate sequence of evidence, place, and explanation. Suitable for investigative features, historical accounts, project retrospectives, and visual explainers.

**Visual grammar.** Use a linear chapter structure with substantial text, full-width documentary images, maps or diagrams where useful, and short transitional passages. A small chapter index provides orientation. A sober sans heading and readable serif body sit on alternating ink and paper sections, with an ochre accent for annotations. Sticky imagery may accompany a passage, but all content remains meaningful in normal document order.

**Specimen and flow.** *The River Works* explains a fictional town's abandoned water system. Readers progress through five chapters, inspect a labelled mechanism diagram, and open evidence captions. Supporting states provide a chapter overview and a plain continuous-reading version.

**Adaptation and identity.** Mobile replaces sticky side-by-side scenes with image-and-text sequences. Reduced motion removes animated transitions. Preserve the explanatory progression and substantial writing; avoid scroll hijacking, text revealed too slowly to read, and spectacle unsupported by content. **Effort: medium.**

#### 09 Glossy Fashion

**Philosophy and fit.** Use art direction and image sequencing to establish a strong editorial world. Suitable for fashion publications, visual culture platforms, photography features, and campaign-led brands.

**Visual grammar.** Compose a full-bleed cover image with an assertive display serif, tightly edited cover lines, and a discreet issue navigation. Interior pages alternate large photographic spreads, intentional white space, cropped details, and short interviews. Use black, paper white, and a single seasonal acid accent. Keep body copy on stable, readable surfaces even when headlines intersect images.

**Specimen and flow.** *Contour Quarterly* presents a fictional visual culture issue. Visitors enter a cover story, move through its image-led chapters, and explore the contributors. Supporting screens provide an issue archive and an image detail view with caption and credit.

**Adaptation and identity.** Mobile uses dedicated portrait crops and restores headings to predictable positions. Preserve editorial image scale and deliberate sequencing; avoid retail product grids, anonymous stock imagery, illegible type overlays, and page-turn gimmicks. Motion remains optional. **Effort: medium.**

#### 10 Evidence Ledger

**Philosophy and fit.** Make claims inspectable and provenance visible. Suitable for institutional research, public record collections, policy trackers, and structured investigative resources.

**Visual grammar.** Use a sober index with compact search, a faceted records table, and a persistent evidence summary. Record pages distinguish the statement, its supporting material, the applicable dates, and interpretation. A humanist sans, tabular numerals, thin rules, white surfaces, navy text, and restrained ochre status marks produce a documentary character. Status labels always include text.

**Specimen and flow.** *Public Works Ledger* contains explicitly fictional contracts and organisations. Visitors filter records, inspect a single assertion, and open its source excerpt beside the assertion. Supporting states show conflicting fixture evidence and a record whose source is unavailable.

**Adaptation and identity.** Mobile turns rows into labelled records and places source material after its associated claim. Preserve provenance, date context, and the distinction between evidence and interpretation; avoid unsupported score badges, dashboard ornament, and graphs that imply unrecorded relationships. Motion is unnecessary. **Effort: medium.**


### Workspaces and discovery designs 11 to 20

#### 11 Operations Console

**Philosophy and fit.** Help experienced users recognise exceptions and complete repetitive work quickly. Suitable for inventory, fulfilment, support queues, administration, and internal operational tools.

**Visual grammar.** A compact application bar and narrow functional sidebar frame a dense, well-aligned table. Use a readable UI sans, tabular numerals, cool white surfaces, slate text, and restrained amber or red for labelled exceptions. Row detail opens in a side panel; filtering and batch actions sit close to the affected records. Counts support the work rather than forming a decorative dashboard.

**Specimen and flow.** *Dispatch Board* models fictional outbound shipments. Users filter delayed shipments, inspect one, and locally update its handling status. Supporting states show a batch action confirmation and an empty filtered result with a reset action.

**Adaptation and identity.** Mobile shows the essential shipment fields in a list, with full detail on a separate view. Preserve data density, predictable selection, and efficient keyboard navigation; avoid oversized cards, ambiguous icon-only actions, and indiscriminate compression. **Effort: medium.**

#### 12 Canvas Workspace

**Philosophy and fit.** Make spatial arrangement part of thinking and organising. Suitable for planning boards, visual research, moodboards, and early concept development.

**Visual grammar.** Place an open working surface beneath a compact toolbar, with a collapsible item library and a small context inspector. Use a light dot grid, warm neutral notes, dark text, and distinct labelled item types. The canvas is the main composition; the surrounding interface stays visually quiet. Spatial groups, connections, and relative position carry meaning.

**Specimen and flow.** *Common Ground* provides a bounded fictional research board. Users add a source note, reposition it, and place it into a named group. Supporting states show a selected item's editable detail and a structured outline containing the same content.

**Adaptation and identity.** Mobile defaults to the outline, with an optional canvas inspection mode. Every placement action also has keyboard and explicit-button controls. Preserve spatial relationships and a usable non-spatial view; avoid implementing an infinite rendering engine, requiring drag gestures, or hiding essential content off-screen. **Effort: high.**

#### 13 Project Workbench

**Philosophy and fit.** Keep a project's structure, current object, and relevant properties available together. Suitable for content editors, asset managers, authoring tools, and technical project interfaces.

**Visual grammar.** Use a three-pane composition: a hierarchical navigator, a central document or object view, and a contextual inspector. A restrained app header holds global actions. Neutral sans text, monospace identifiers, graphite surfaces, bright readable text, and a single teal selection accent establish a workmanlike environment. Pane boundaries and selected states should be clear without elaborate chrome.

**Specimen and flow.** *Scene Workshop* contains a fictional collection of game scenes. Users select a scene, edit its descriptive metadata, and preview the resulting scene card. Supporting states show unsaved changes with a discard action and a search result that opens the matching object.

**Adaptation and identity.** Mobile converts panes into labelled views while preserving selection and edits. Preserve hierarchical context and the relationship between object and inspector; avoid turning the centre into a metrics dashboard or building a full code editor. **Effort: medium.**

#### 14 Guided Journey

**Philosophy and fit.** Reduce a complicated decision into understandable, reversible steps. Suitable for onboarding, applications, configuration, booking preparation, and structured self-assessment.

**Visual grammar.** Use a calm single-column stage, a compact progress indicator, a clear current question, and a persistent summary of collected choices. A warm sans, generous control spacing, pale stone background, dark plum text, and a restrained violet action colour support focus. Group related questions together; introduce explanatory text before unfamiliar choices rather than hiding it behind tooltips.

**Specimen and flow.** *Workshop Finder* guides visitors through choosing an interest, available day, and preferred format before recommending fixture workshops. Supporting states show an incomplete required answer with inline guidance and a review screen where any answer can be edited.

**Adaptation and identity.** Mobile keeps the current question and navigation actions in a stable order, without obscuring content behind fixed controls. Preserve reversibility, visible progress, and informative summaries; avoid one-click-per-word pacing, false urgency, and unexplained branching. Motion can be disabled entirely. **Effort: medium.**

#### 15 Temporal Planner

**Philosophy and fit.** Make time, duration, overlap, and availability immediately legible. Suitable for schedules, personal planning, project calendars, event programmes, and resource booking.

**Visual grammar.** Use a time-based grid with explicit day and hour labels, a narrow agenda rail, and a compact toolbar for period and view changes. A friendly UI sans, clean white ground, dark blue-grey ink, and a small palette of labelled activity categories organise the page. Current selection, unavailable periods, and overlapping items have visibly different treatments.

**Specimen and flow.** *Weekcraft* contains a fictional workshop schedule. Users select a session, move it through an explicit date-and-time form, and inspect the updated week. Supporting states show a scheduling conflict and an agenda view containing the same appointments.

**Adaptation and identity.** Mobile defaults to the agenda or a single-day view; horizontal swiping is optional. Preserve the time structure and text labels; avoid drag-only editing, colour-only categories, and compressing a whole week into unreadable columns. Motion simply confirms a change. **Effort: medium.**

#### 16 Field Atlas

**Philosophy and fit.** Use location as the primary route into information. Suitable for local guides, public amenities, heritage trails, travel research, and geographically organised collections.

**Visual grammar.** Pair a large, deliberately styled map with a compact searchable place list and a filter bar. Use an earthy cream ground, dark green labels, blue waterways, and distinct labelled place markers. A practical sans and small cartographic labels reinforce the atlas character. The selected place remains obvious in both map and list.

**Specimen and flow.** *Northbank Footpaths* uses an original SVG map of a fictional district. Visitors filter trails by surface, select a route, and inspect its stops and access notes. Supporting states show a route detail and a list-only search result.

**Adaptation and identity.** Mobile uses a clear map/list switch while preserving filters and selection. All places remain reachable through ordinary links; the reference needs no geolocation or external map service. Preserve geographic relationships and readable labels; avoid decorative maps disconnected from results or essential hover interactions. **Effort: medium.**

#### 17 Observatory

**Philosophy and fit.** Help users detect patterns, compare measures, and inspect uncertainty within a coherent instrument panel. Suitable for analytics, monitoring, scientific demonstrations, and resource tracking.

**Visual grammar.** Use a dark, quiet plotting surface with a persistent control strip and aligned charts sharing meaningful time axes. A technical sans, monospace readouts, muted grid lines, and restrained cyan, amber, and violet series colours support inspection. Keep charts large enough to read; choose panels because their measures relate, not because a grid needs filling.

**Specimen and flow.** *Watershed Observatory* displays clearly labelled synthetic river measurements. Users change a date interval, compare two stations, and inspect a selected reading. Supporting states provide a data table and a missing-data interval with its cause explained in fixture text.

**Adaptation and identity.** Mobile presents plots in a meaningful sequence and replaces small hover targets with selectable readings. Preserve scales, units, labels, and distinctions between missing and zero values; avoid animated counters, fake live activity, and ornamental gauges. **Effort: high.**

#### 18 Knowledge Garden

**Philosophy and fit.** Encourage exploration through connected ideas while showing where each piece belongs. Suitable for personal knowledge bases, wikis, research notes, and living project documentation.

**Visual grammar.** Use a readable central note, a compact topic tree, and a contextual rail for backlinks and related concepts. Soft grey-green surfaces, dark green-black text, a modest serif title, and a clear sans body create a cultivated, practical tone. The interface distinguishes a note's hierarchy from its cross-links; a small trail records the current route through the collection.

**Specimen and flow.** *The Small Systems Garden* contains fictional notes on everyday design. Visitors open a concept, follow a contextual link, and inspect notes that link back to it. Supporting views show a topic overview and a local search result with matched passages.

**Adaptation and identity.** Mobile moves the tree and backlinks into clearly labelled sections. Preserve readable notes, meaningful connections, and stable URLs; avoid graph visualisations as compulsory navigation, unexplained tags, and decorative pseudo-botanical clutter. **Effort: medium.**

#### 19 Conversation Desk

**Philosophy and fit.** Make a bounded information exchange feel direct and responsive. Suitable for product guidance, structured support, intake, and interactive learning with a clearly defined decision tree.

**Visual grammar.** A spacious conversation column sits beside a live summary of resolved answers. Use humanist sans text, warm white, dark ink, restrained blue response emphasis, and subtle dividers between exchanges. Present suggested replies as explicit controls and longer explanations as readable paragraphs. A small persistent navigation offers restart, review, and a direct browse alternative.

**Specimen and flow.** *Desk Guide* helps a fictional coworking visitor choose a workspace. Visitors answer a finite set of scripted questions, receive a fixture recommendation, and revise an earlier answer. Supporting states show an unsupported free-text response with suggested choices and a complete answer summary.

**Adaptation and identity.** Mobile keeps the active exchange and summary easy to reach without trapping the viewport. Preserve conversational continuity and editable answers; avoid fake typing delays, claims of intelligence, and mandatory chat for information available directly. **Effort: medium.**

#### 20 The Directory

**Philosophy and fit.** Help users narrow a large collection and compare candidates efficiently. Suitable for professional listings, software catalogues, resource collections, local services, and structured recommendations.

**Visual grammar.** Use prominent search, a stable facet column, a concise results summary, and information-rich horizontal listings. A crisp sans, white and pale blue-grey surfaces, deep charcoal text, and restrained teal selections make the contents easy to scan. Each record exposes the same useful attributes; small thumbnails remain secondary. An optional comparison tray collects chosen records.

**Specimen and flow.** *Useful Places* catalogues fictional workspaces. Visitors filter by equipment and opening day, compare selected venues, and inspect a detailed listing. Supporting states show no matching results with removable filters and a comparison view that highlights differing attributes.

**Adaptation and identity.** Mobile uses an explicit filter panel, visible active filters, and stacked comparison attributes. Preserve comparability, predictable facets, and clear result feedback; avoid marketplace promotion modules, arbitrary recommendation ordering, and a wall of image-led cards. Motion is unnecessary. **Effort: medium.**


### Commerce places and services 21 to 30

#### 21 Utility Storefront

**Philosophy and fit.** Make a purchase easy to evaluate. Suitable for hardware, supplies, specialist equipment, and stores where specifications, availability, and compatibility matter more than a campaign image.

**Visual grammar.** A category tree and breadcrumbs lead into a dense purchasable SKU matrix. Each compact row has a part code, compatibility, stock, quantity input, and add action; thumbnails remain small. Use a utilitarian condensed sans for category labels, monospaced part codes, graphite text, white surfaces, blue links, and amber availability notices. Subtle row bands and rules organise information.

**Specimen and flow.** *Bench Supply* sells workshop tools. Choose a battery platform, configure compatible tool and battery quantities directly in the matrix, and review a local basket. Supporting views include a compatibility detail and a basket with an unavailable-item state. A bulk-entry control accepts known fixture part codes.

**Responsive behaviour.** The category tree becomes a disclosure; each SKU becomes a compact labelled block retaining quantity and add controls. The shopping flow remains usable by keyboard and does not depend on hover.

**Identity rules.** Preserve visible specifications and restrained merchandising. Avoid oversized lifestyle heroes, hidden pricing, and arbitrary card heights. **Effort: medium.**

#### 22 Specimen Shop

**Philosophy and fit.** Present a small collection as objects worth studying. Appropriate for ceramics, independent furniture, collectible editions, and carefully made products with material stories.

**Visual grammar.** Each object occupies a large photographic plate, followed by a caption, dimensions, material swatches, and a restrained purchase rail. Use asymmetric whitespace, a compact index navigation, an elegant serif for object names, and a precise sans for specifications. Bone backgrounds, near-black text, and one mineral accent keep attention on surface and shape.

**Specimen and flow.** *Form Number* offers a fictional ceramics collection. Browse an object index, open a numbered vessel, change its glaze, and add it to a local bag. Supporting views include a material-study page and a bag with quantity and sold-out states. A visible detail photograph supports inspection without requiring zoom gestures.

**Responsive behaviour.** Plates stack above specifications; the purchase rail becomes an ordinary in-flow block. Image changes are immediate under reduced motion.

**Identity rules.** Preserve the object-and-caption relationship. Avoid luxury-site vagueness, tiny essential text, and compulsory cinematic transitions. **Effort: medium.**

#### 23 Market Bazaar

**Philosophy and fit.** Make the individuality of many sellers part of the browsing experience. Useful for craft marketplaces, community markets, independent food halls, and local maker directories.

**Visual grammar.** Organise the page into recognisable stalls rather than a uniform product wall. Each vendor receives a coloured sign, short introduction, and horizontal shelf of items. Warm cream supports paprika, cobalt, and mustard accents. Rounded display lettering identifies stalls; straightforward body type handles prices, ingredients, and collection information.

**Specimen and flow.** *Saturday Market* contains fictional bakers, potters, and growers. Choose a market date, browse stalls, and assemble a local collection basket. Supporting views include a vendor profile and a basket grouped by collection location. An empty date state explains when the next market occurs.

**Responsive behaviour.** Stalls become stacked sections with anchor navigation. Shelves use explicit previous and next controls as well as touch scrolling; products remain reachable without dragging.

**Identity rules.** Preserve vendor personality within predictable buying controls. Avoid making every stall a different application or replacing useful categories with decorative chaos. **Effort: medium.**

#### 24 Fine Dining

**Philosophy and fit.** Build anticipation through pacing, seasonality, and precise hospitality. Suitable for restaurants, tasting experiences, wine bars, and small culinary venues.

**Visual grammar.** The menu provides the main compositional rhythm: course titles, descriptions, and prices arranged as a carefully typeset sequence. A narrow navigation offers menu, visit, and reservations. Deep oxblood, ivory, and muted brass support editorial food photography, a characterful serif, and generous vertical intervals. Rules and small botanical details replace repeated boxes.

**Specimen and flow.** *Ember & Orchard* presents a seasonal restaurant. Read the current menu, inspect dietary information, and choose a date and party size in a local reservation demonstration. Supporting views include private dining and a clear unavailable-time state with nearby alternatives. The final confirmation is visibly a sample reservation.

**Responsive behaviour.** Menu descriptions and prices remain aligned without shrinking text. The reservation form becomes a simple vertical sequence; photography does not obstruct it.

**Identity rules.** Preserve the menu’s reading rhythm and practical visit information. Avoid autoplay ambience, illegible gold text, and hiding prices behind photographs. **Effort: medium.**

#### 25 Local Trades

**Philosophy and fit.** Answer the questions a customer has before contacting a local business. Appropriate for trades, storage facilities, repair services, and appointment-based businesses.

**Visual grammar.** Lead with service, coverage area, opening hours, and a clear contact action. Follow with a price or service table, practical photographs, and specific evidence of work. Use robust sans-serif headings, dark navy text, white and pale grey surfaces, and a safety-orange accent reserved for actions. Navigation names the work directly.

**Specimen and flow.** *Northline Repairs* serves a fictional town. Select a repair type, inspect service details, and complete a quote-request demonstration. Supporting views include service-area information and a submitted-request summary. Form validation explains missing information beside the relevant field; no message is actually sent.

**Responsive behaviour.** Phone and enquiry actions stay easy to reach without covering the page. Service tables collapse into labelled records; addresses and hours remain visible text.

**Identity rules.** Preserve plain answers, real-looking work examples, and clear contact routes. Avoid generic stock-photo heroes, fabricated review badges, and excessive animation. **Effort: low.**

#### 26 Field Notes

**Philosophy and fit.** Organise discovery around observation, place, and practical preparation. Fits outdoor guides, conservation groups, travel journals, and field-based education.

**Visual grammar.** Use notebook-like entries with location, season, conditions, and annotated photographs. A modest section index gives access to routes, observations, and equipment. Moss green, sand, and charcoal accompany a readable serif, compact sans labels, and restrained line illustrations. Texture stays behind content and never carries information.

**Specimen and flow.** *Ridge Journal* documents fictional walking routes. Filter routes by terrain, read a route’s field report, and add required equipment to a local packing checklist. Supporting views include an observation detail and a saved-routes list with an empty state. Distances and conditions are explicitly sample data.

**Responsive behaviour.** Annotations move beneath images in a numbered list. Route information appears before decorative imagery; checklists use large labelled controls and work without map gestures.

**Identity rules.** Preserve the relationship between observation and practical detail. Avoid turning the design into a generic green wellness site or making essential information resemble faint handwriting. **Effort: medium.**

#### 27 Blueprint Studio

**Philosophy and fit.** Explain how a project is organised and constructed. Suitable for architecture, fabrication, engineering portfolios, and technically minded creative studios.

**Visual grammar.** Arrange projects as indexed drawing sheets with title blocks, section markers, disciplined grids, and paired plan-and-photograph views. Use midnight blue, chalk white, and a restrained cyan annotation colour. A technical sans pairs with monospaced drawing labels. Thin lines establish measured relationships without implying that the interface itself is a technical drawing.

**Specimen and flow.** *Section Works* presents fictional small buildings. Select a project, switch between plan, section, and built result, then open the relevant construction note. Supporting views include the project index and a material detail sheet. A compare control allows paired views without requiring a draggable divider.

**Responsive behaviour.** Drawing sheets become stacked plates with a persistent view selector. Captions remain readable outside the drawings, and technical labels receive a text equivalent.

**Identity rules.** Preserve indexed sheets, aligned annotations, and evidence of construction. Avoid decorative measurement marks, microscopic specifications, and animated drafting effects around every element. **Effort: medium.**

#### 28 Grand Hotel

**Philosophy and fit.** Let visitors imagine an arrival, then make the booking choices concrete. Fits destination hotels, lodges, retreats, and travel accommodations.

**Visual grammar.** A sequence of wide photographic scenes introduces arrival, rooms, surroundings, and daily life. A compact booking rail accompanies the story. Use restrained serif display type, warm white surfaces, deep forest text, and terracotta accents. Navigation separates staying, exploring, and planning; room information uses consistent comparisons beneath the narrative.

**Specimen and flow.** *Alder House* is a fictional lakeside hotel. Select dates, compare rooms, and review a sample booking summary. Supporting views include a room detail and an availability result with no matching rooms. Amenities, occupancy, and cancellation examples appear beside the decision they affect.

**Responsive behaviour.** The booking rail becomes an accessible expandable section with a persistent summary. Photographic scenes retain ordinary scrolling; essential room details load before optional imagery.

**Identity rules.** Preserve the arrival narrative and explicit booking information. Avoid scroll hijacking, looping video as a requirement, and identical full-screen photographs with no useful content. **Effort: medium.**

#### 29 Calm Sanctuary

**Philosophy and fit.** Reduce the number of simultaneous decisions and let the visitor set the pace. Appropriate for quiet reading, gentle routines, reflective tools, and low-stimulation personal experiences.

**Visual grammar.** Use one narrow content column, short sequences, abundant breathing room, and persistent but unobtrusive back navigation. Warm stone, deep plum, and muted sage support a soft humanist sans. Essential text retains strong contrast; calm comes from composition and pacing, not faint lettering. Controls have clear boundaries and restrained feedback.

**Specimen and flow.** *Evening Room* offers fictional wind-down activities. Choose an activity, optionally set a duration, and enter a quiet practice screen. Supporting views include personal preferences and a finished-session state that offers an ordinary exit. No streaks, competitive scores, or surprise prompts appear.

**Responsive behaviour.** The primary control sits comfortably within the viewport; orientation changes preserve session state. Sound and motion start off and require deliberate activation.

**Identity rules.** Preserve voluntary pacing and limited choices. Avoid claiming therapeutic outcomes, using autoplay transitions, or introducing celebratory feedback at the end. **Effort: low.**

#### 30 Festival Poster

**Philosophy and fit.** Turn a programme into a memorable public announcement. Suitable for festivals, theatre seasons, screenings, exhibitions, and music events.

**Visual grammar.** Oversized condensed type, date stamps, alternating colour fields, and overlapping poster blocks establish the hierarchy. Cobalt, hot coral, and off-white form the base palette. The navigation remains a clear strip for programme, venues, and tickets; the event schedule uses clean rows beneath the expressive masthead.

**Specimen and flow.** *Night Signal* presents a fictional arts weekend. Filter the programme by day and venue, inspect an event, and save it to a local itinerary. Supporting views include a venue guide and an itinerary conflict state when events overlap. Ticket buttons open a clearly labelled sample ticket panel.

**Responsive behaviour.** Poster typography resizes without clipping event names. Schedule rows become stacked records; overlapping decorative elements separate before they crowd information. Motion is optional and never required to read dates.

**Identity rules.** Preserve the collision of bold announcement and usable timetable. Avoid turning every event into an identical rounded card or placing essential text inside raster posters. **Effort: medium.**


### Playful material and early web designs 31 to 40

#### 31 Bauhaus Workshop

**Philosophy and fit.** Give each shape, colour, and alignment a clear organising role. Useful for design schools, creative workshops, modular products, and educational programmes.

**Visual grammar.** Strong rectilinear grids support circular markers, primary-colour planes, black rules, and compact grotesque typography. Asymmetry comes from purposeful spans rather than scattered objects. Red identifies workshops, blue identifies resources, and yellow identifies demonstrations, with matching text labels so colour is never the only distinction.

**Specimen and flow.** *Form School* teaches fictional making workshops. Browse a geometric programme index, open a workshop syllabus, and select a session in a local registration demonstration. Supporting views include an instructor profile and a full-session state with alternative dates. A simple shape-building exercise illustrates the school’s practical approach.

**Responsive behaviour.** Grid spans collapse into a coherent reading order. Decorative geometry moves around the content rather than forcing the content into tiny compartments; the exercise includes button-based controls.

**Identity rules.** Preserve geometric discipline, clear categories, and deliberate alignment. Avoid decorative primary-colour confetti or borrowing the same loose arrangement as Pop Memphis. **Effort: medium.**

#### 32 Pop Memphis

**Philosophy and fit.** Make browsing feel exuberant and surprising while keeping decisions predictable. Fits playful lifestyle brands, creative clubs, youth-oriented events, and cheerful product launches.

**Visual grammar.** Offset blocks, squiggles, stipple patterns, contrasting outlines, and deliberately mismatched geometric frames provide the visual language. Lavender, mint, melon, and black carry a bold rounded display face over plain body text. Navigation stays anchored in a solid strip; patterns occupy margins and section transitions.

**Specimen and flow.** *Odd Objects Club* offers fictional monthly creative kits. Explore a themed collection, inspect kit contents, and customise a sample bundle. Supporting views include a member-project gallery and a bundle summary with an incompatible-item explanation. The interaction is ordinary selection, supported by lively visual responses.

**Responsive behaviour.** Offset layouts become staggered but readable vertical sections. Pattern density decreases on small screens; reduced motion removes bouncing and rotation while preserving selected-state feedback.

**Identity rules.** Preserve deliberate clashes of pattern and shape. Avoid repeating identical cards, using patterns beneath body copy, or letting random rotation impair controls. **Effort: medium.**

#### 33 Playroom

**Philosophy and fit.** Teach an interaction through visible, manipulable objects. Suitable for learning tools, creative configurators, simple games, and approachable planning experiences.

**Visual grammar.** A bounded tabletop contains chunky objects, recessed slots, tactile buttons, and a compact tool shelf. Rounded type, warm cream, tomato red, sky blue, and soft material shadows make the interface approachable. A clear instruction line sits outside the play area, and object labels remain ordinary readable text.

**Specimen and flow.** *Little Machine Lab* uses a small fixed set of parts and slots with deterministic responses, without a general physics engine. Select parts, place them in slots, and run the demonstration. Supporting views include a parts library and a saved-construction view with an incomplete-machine state. Keyboard selection and explicit move controls provide every action available through dragging.

**Responsive behaviour.** The tabletop changes to a vertical sequence of slots rather than shrinking a desktop canvas. Optional spring motion becomes immediate state changes under reduced motion.

**Identity rules.** Preserve understandable cause and effect and tangible controls. Avoid ornamental toy shapes around conventional forms, mandatory sound, or physics effects that make precise actions unreliable. **Effort: high.**

#### 34 Hand Drawn Desk

**Philosophy and fit.** Show thought developing through explanation, annotation, and revision. Fits tutorials, workshop materials, personal teaching sites, and approachable technical writing.

**Visual grammar.** Make numbered illustrated steps the main structure: a large diagram, a short explanation, and a practice prompt. Attach callouts to parts of the drawing rather than maintaining a prose annotation margin. Warm paper, graphite, blue ink, and a red correction accent support a readable sans body face. Handwriting appears only in short secondary notes; a compact step index supplies navigation.

**Specimen and flow.** *Explain It Slowly* teaches an original simple mechanism. Inspect a diagram, reveal labelled forces or moving parts, and predict the next step. Supporting views include the illustrated lesson index and answer feedback that connects the prediction to the diagram. The reader can toggle annotations without losing their position.

**Responsive behaviour.** Drawing callouts become a numbered explanation below each diagram. Diagrams include captions and text accounts; animation never replaces the written explanation of how a mechanism works.

**Identity rules.** Preserve explanatory annotation and visible thinking. Avoid fake handwritten paragraphs, random scribbles with no meaning, and confusing a teaching notebook with an archival card cabinet. **Effort: medium.**

#### 35 Paper Cabinet

**Philosophy and fit.** Make a collection feel organised, discoverable, and worth returning to. Appropriate for archives, recipe libraries, reading collections, and curated research materials.

**Visual grammar.** Tabbed drawers introduce categories; index cards present consistent metadata; a detail sheet holds the full record. Use buff paper, dark brown text, muted olive tabs, fine rules, and a modest serif paired with monospaced accession labels. Physical cues clarify organisation without requiring a simulated filing cabinet.

**Specimen and flow.** *The Commonplace Cabinet* collects fictional historical recipes. Choose a drawer, filter cards by ingredient or period, and open a recipe record. Supporting views include saved selections and a record with missing provenance clearly marked. Users can add a private note stored locally and return to the same filtered list.

**Responsive behaviour.** Drawer tabs become a labelled category selector. Cards stack in a single readable column; record sheets open as ordinary pages rather than floating paper windows.

**Identity rules.** Preserve stable metadata, tactile hierarchy, and the index-to-record relationship. Avoid ornamental desk clutter, unreadable ageing effects, or hiding navigation inside decorative objects. **Effort: medium.**

#### 36 Punk Zine

**Philosophy and fit.** Treat publishing as an authored, opinionated act. Suitable for independent magazines, music collectives, criticism, activist archives, and underground event programmes.

**Visual grammar.** A masthead anchors an irregular editorial spread: narrow text columns, cutout photography, rotated section labels, torn dividers, and deliberately mismatched headline scales. Use condensed grotesque headlines, readable serif body copy, ink black, dirty white, and one acidic spot colour. A plain contents strip provides dependable navigation beneath the collage.

**Specimen and flow.** *Underpass* is a fictional independent music journal. Open an issue, select a feature from its annotated cover, and read the full article. Supporting views are a chronological issue archive and an article’s credits and related reading section. All decorative scraps accompany actual editorial content.

**Mobile and motion.** Recompose the spread into a clear reading sequence; captions remain beside their images. Collage elements are static, with no background jitter or compulsory animation.

**Identity and effort.** Preserve material layering and editorial tension; avoid illegible body text, arbitrary overlap, and a conventional card grid hidden beneath distress textures. **Effort: medium.**

#### 37 Comic Serial

**Philosophy and fit.** Explain through sequence, juxtaposition, and a recognisable narrator. Suitable for illustrated journalism, educational stories, episodic fiction, and playful product explanations.

**Visual grammar.** Arrange scenes as panels with purposeful changes in scale: an establishing image, close detail, and explanatory beat. Chapter navigation sits above the story; a persistent progress label identifies the current scene. Use rounded display lettering for short dialogue, a readable sans serif for explanation, heavy ink boundaries, and a restrained illustration palette. Speech balloons never contain essential text solely inside an image.

**Specimen and flow.** *Neighbourhood Mythologies* presents fictional local history stories. Choose a chapter, move through its panels, then open the next episode. Supporting views are the illustrated chapter index and a complete text transcript with image descriptions.

**Mobile and motion.** Stack panels in their authored reading order. Desktop spreads become vertical scenes without swipe dependence; optional panel transitions disappear under reduced motion.

**Identity and effort.** Preserve narrative pacing and panel relationships; avoid rendering an ordinary landing page inside comic borders. **Effort: medium**, with a separate illustration workload.

#### 38 Pixel Arcade

**Philosophy and fit.** Make browsing feel like selecting a game from a cabinet. Suitable for game clubs, indie releases, playful events, and compact entertainment directories.

**Visual grammar.** A framed screen contains a prominent selection list, a preview window, and a narrow status strip. Use pixel display lettering for short titles, ordinary readable type for descriptions, a dark background, sharply separated saturated colours, and deliberately stepped borders. Navigation uses visible buttons and links; directional keys can be an optional enhancement.

**Specimen and flow.** *Quarter Club* is a fictional local games collective. Browse event cartridges, open a tournament’s details, and reserve a sample attendance slot locally. Supporting states are a filtered event selection and an explicit demo reservation confirmation. Rankings and attendance figures come from labelled fixtures.

**Mobile and motion.** Replace the cabinet frame with a compact selector above the preview. Controls remain finger sized. Disable flashes and looping attract sequences; sound starts only through a deliberate user action.

**Identity and effort.** Preserve discrete screen composition and game menu hierarchy; avoid neon decoration over standard SaaS cards. **Effort: medium.**

#### 39 Personal Web 1999

**Philosophy and fit.** Express a person’s interests through a small, hand maintained web of pages. Suitable for personal sites, fan communities, hobby collections, and informal project journals.

**Visual grammar.** Use a compact masthead, a visible link directory, short update entries, tiny original badges, and an intentionally modest content width. Default-like serif copy and blue underlined links coexist with simple coloured table-like panels built using modern layout CSS. A repeating background pattern can surround a solid, readable content surface.

**Specimen and flow.** *Moth Observatory* is a fictional enthusiast’s website. Follow a homepage journal link, read an entry, then navigate to adjacent entries. Supporting pages are a curated links directory and a guestbook with clearly local-only sample submissions. A site map keeps every destination discoverable.

**Mobile and motion.** Collapse the link rail above the content, wrap badges, and keep text comfortably readable. Any small animated decoration has a pause control or a static alternative.

**Identity and effort.** Preserve personal miscellany, direct linking, and homemade composition; avoid copying obsolete browser failures or inserting fake broken links. **Effort: low.**

#### 40 Desktop 1995

**Philosophy and fit.** Present a small collection as familiar, named tools and folders. Suitable for portfolios, digital exhibitions, personal project collections, and compact creative utilities.

**Visual grammar.** A desktop, icon labels, bevelled window frames, title bars, and a task strip organise content into discrete applications. Use a neutral grey interface, one selected-state colour, compact system-like typography, and restrained bitmap accents. Windows have explicit open, close, minimise, and maximise controls; their content uses semantic document structure.

**Specimen and flow.** *Parcel OS* is a fictional designer’s portfolio with only Projects, Contact, and Help windows. Open Projects, select a case study, then open its contact form. Supporting states are an application switcher and a help view explaining the controls. Window positioning is optional; a general desktop framework is outside the specimen's scope.

**Mobile and motion.** Show one full-width application at a time, with a clear back control and application list. Keyboard focus follows the active window and returns to its launcher when closed.

**Identity and effort.** Preserve the desktop’s task model; avoid decorative windows that obscure navigation or pretend to access the visitor’s filesystem. **Effort: high.**


### Digital retro and experimental designs 41 to 50

#### 41 Terminal Manual

**Philosophy and fit.** Make technical information feel immediate, inspectable, and economical. Suitable for developer documentation, command reference guides, release logs, and technical portfolios.

**Visual grammar.** Build a text-first document with a narrow command index, full-width examples, prompt markers, and terse status labels. Use a monospace family with comfortable line spacing, near-black surfaces, warm pale text, and limited green or amber accents. Heading hierarchy and ordinary underlined links carry the structure; colour alone never identifies a command’s status.

**Specimen and flow.** *Relay CLI* documents a fictional file synchronisation utility. Select a command, inspect its arguments, edit a harmless example’s options, and copy the resulting sample command. Supporting states are search with no matching command and an expanded examples section. Nothing executes in a shell.

**Mobile and motion.** Move the index into an accessible disclosure and let long code blocks scroll within their own bounds. Text appears immediately; simulated typing is optional and off by default.

**Identity and effort.** Preserve text density and documentation logic; avoid demanding typed commands to navigate or decorating every page with fake hacker output. **Effort: low.**

#### 42 Teletext Bulletin

**Philosophy and fit.** Deliver compact, regularly structured information through explicit sections and numbered pages. Suitable for event bulletins, community updates, sports summaries, and small informational directories.

**Visual grammar.** Use a broadcast-style title strip, visible page identifier, tightly organised text rows, block colour bands, and a footer of section links. Monospaced display text and rectangular graphics create the character. Keep a deliberately limited palette, while choosing text and background combinations that remain readable. Unlike a terminal, the page resembles an edited bulletin, without prompts or command history.

**Specimen and flow.** *TownText* is a fictional community notice service. Choose What’s On, open a numbered event page, and follow its booking information. Supporting views are the subject index and a saved-pages list stored locally. Dates are labelled sample content.

**Mobile and motion.** Preserve section order while allowing lines to wrap; do not shrink the entire broadcast frame into illegible miniature text. Page-number entry supplements visible links.

**Identity and effort.** Preserve editorial compression and numbered navigation; avoid mandatory memorised codes, flashing text, and pixel-game decoration. **Effort: low.**

#### 43 Y2K Chrome

**Philosophy and fit.** Present culture as a luminous piece of digital equipment. Suitable for electronic music labels, nightlife programmes, experimental fashion, and creative release collections.

**Visual grammar.** Compose a central media module with asymmetric side controls, metallic dividers, translucent inset panels, pill-shaped switches, and compact release metadata. Use an extended display face, a straightforward sans serif for details, cool silver, deep navy, and electric cyan. Chrome belongs to framing and highlights; long text sits on a calm solid surface.

**Specimen and flow.** *Signal Mesh* is a fictional electronic music label. Browse its release strip, open an album, and select a track for an explicitly initiated preview. Supporting views are artist credits and the player’s paused or unavailable-preview state. Local licensed audio is an optional specimen asset.

**Mobile and motion.** Stack the release controls above a persistent compact player. Replace decorative moving reflections with static gradients under reduced motion; playback never starts automatically.

**Identity and effort.** Preserve equipment-like composition and material contrast; avoid tiny controls, low-contrast metallic copy, and a generic gradient landing page. **Effort: medium.**

#### 44 Neo Brutalist Board

**Philosophy and fit.** Make participation and choice conspicuous through bold, tangible objects. Suitable for maker communities, workshop listings, independent shops, and energetic small product sites.

**Visual grammar.** Use thick dark outlines, solid offset shadows, large utilitarian type, and a small palette of flat, vivid colours. Organise the page as a board of labelled notices in clearly separated horizontal zones. Filters and actions have the same physical vocabulary as the notices. A strong alignment system prevents the apparent roughness from becoming arbitrary.

**Specimen and flow.** *Open Bench* lists fictional maker workshops. Filter notices by discipline, open a workshop, and book a sample place locally. Supporting views are a full workshop detail sheet and the no-spaces-available state with alternative dates.

**Mobile and motion.** Reflow notices into an ordered list and give filters their own wrapping row. A press response can shorten a button’s shadow without shifting its neighbours; reduced motion removes animated movement.

**Identity and effort.** Preserve outlined objects and decisive hierarchy; avoid confusing this with raw HTML or covering every content fragment in a separate box. **Effort: low.**

#### 45 Raw Manifesto

**Philosophy and fit.** Let language and direct access carry the entire identity. Suitable for artist statements, small organisations, independent publishing, and intentionally austere portfolios.

**Visual grammar.** Use a near-unadorned page, exceptionally large opening text, abrupt but deliberate changes in scale, visible underlined links, and full-width rules. A standard sans serif or serif family can do all the work. Keep the palette nearly monochrome, with a single functional link colour. Navigation is an explicit line of destinations, followed by a clear document sequence.

**Specimen and flow.** *Common Room* is a fictional artist-run programme. Read its opening statement, follow the current programme link, and inspect one event’s practical details. Supporting pages are a chronological archive and a plain contact page with a functional demonstration form.

**Mobile and motion.** Headline sizes adapt to the available width, while body text keeps a comfortable measure. Source order is visual order. The default experience contains no animation or overlay navigation.

**Identity and effort.** Preserve textual force and deliberate sparseness; avoid turning minimal styling into broken layout or quietly restoring rounded cards and sales sections. **Effort: low.**

#### 46 Kinetic Type

**Philosophy and fit.** Let typography embody a subject’s rhythm while preserving a complete readable argument. Suitable for cultural festivals, creative studios, short campaigns, and expressive editorial introductions.

**Visual grammar.** Use a small number of oversized text compositions, strong negative space, and a restrained palette. Letter spacing, position, weight, or cropping may change as an enhancement. A conventional contents control and a stable text column provide the structural spine. Motion reinforces section boundaries or emphasis; it does not manufacture the only route through the content.

**Specimen and flow.** *Voice Assembly* is a fictional spoken-word festival. Read its animated introduction, browse the programme, and inspect a performer’s session. Supporting views are the schedule and an entirely static reading mode containing identical information.

**Mobile and motion.** Design static mobile typography first. Honour reduced motion on first render, retain normal scrolling, and provide a persistent animation toggle. Never require waiting for text to settle before it becomes usable.

**Identity and effort.** Preserve typographic performance and disciplined pacing; avoid scroll hijacking, endlessly moving navigation, or illegible letter tricks. **Effort: high.**

#### 47 Colour Field

**Philosophy and fit.** Make a site’s chapters legible through large fields of colour and simple spatial relationships. Suitable for cultural institutions, compact brand narratives, exhibitions, and design-led service portfolios.

**Visual grammar.** Compose substantial flat-colour planes with sharp boundaries, sparse geometric markers, large headings, and deliberately limited image use. A chapter rail crosses these planes with a consistent navigation position. Typography stays restrained so the relationship between colour, proportion, and whitespace provides the identity. Each field includes a visible section label; colour never carries its meaning alone.

**Specimen and flow.** *Intervals* is a fictional exhibition space. Move between programme, visiting information, and membership chapters, then open an exhibition’s details. Supporting views are the complete exhibition index and a membership comparison laid out as aligned text columns.

**Mobile and motion.** Turn side-by-side planes into an orderly vertical sequence. Keep ordinary scrolling and explicit anchor links; any transition simply fades between static compositions and can be disabled.

**Identity and effort.** Preserve large-scale colour composition; avoid shrinking the concept into many pastel cards or requiring full-screen snapping. **Effort: medium.**

#### 48 Spatial Gallery

**Philosophy and fit.** Let spatial arrangement communicate relationships between a deliberately small collection of objects. Suitable for digital exhibitions, architecture showcases, art collections, and immersive portfolios.

**Visual grammar.** Present a shallow spatial stage in CSS or SVG, with clearly labelled exhibits and a permanent destination list. A three-dimensional renderer is optional only if it adds necessary spatial meaning. Use quiet architectural surfaces, neutral framing, restrained type, and object-specific imagery. Distance and grouping convey curatorial relationships. A standard detail panel holds all substantive text.

**Specimen and flow.** *Small Museum* exhibits fictional design objects. Choose an exhibit from the scene or its equivalent list, inspect its description, and move to a related object. Supporting views are the complete collection list and an object detail page with a stable URL.

**Mobile and motion.** Default to a two-dimensional arrangement or the list on constrained devices. Reduced motion removes camera travel. Keyboard users can visit every exhibit without steering through space; failed rendering leaves the list available.

**Identity and effort.** Preserve meaningful spatial grouping; avoid mandatory free movement, heavy introductory sequences, or essential text embedded in a canvas. **Effort: high.**

#### 49 Parametric Studio

**Philosophy and fit.** Explain a design system by letting visitors change its rules and observe the result. Suitable for generative design portfolios, configurable products, educational tools, and typography or fabrication experiments.

**Visual grammar.** Pair a large specimen stage with an explicitly labelled control column, a short explanation, and a compact preset strip. Use fine measurement rules, neutral surfaces, technical typography, and colour that identifies adjustable properties. Render suitable geometry with SVG or CSS so the demonstration remains crisp and inspectable.

**Specimen and flow.** *Pattern Works* demonstrates a fictional modular screen system. Choose a preset, adjust spacing and angle, and inspect the resulting pattern and parameter summary. Supporting states are a side-by-side preset comparison and a restored-default configuration. Values can persist in the URL for direct sharing.

**Mobile and motion.** Stack the specimen above controls and provide numeric inputs alongside sliders. Changes update directly, with no perpetual animation or pointer-only controls. A static preset remains available if an enhancement fails.

**Identity and effort.** Preserve visible relationships between controls and outcomes; avoid random decorative generators without a meaningful design question. **Effort: medium.**

#### 50 Infinite Index

**Philosophy and fit.** Make a finite collection feel explorable at several scales without surrendering orientation. Suitable for visual archives, design references, photography collections, and substantial creative portfolios.

**Visual grammar.** Use a dense, edge-to-edge index with an anchored search strip, visible result count, clear grouping labels, and selectable overview, medium, and detail densities. Thumbnails and short captions carry the page; typography and chrome recede. Density changes alter how much context is visible, rather than simply enlarging cards inside a conventional landing page.

**Specimen and flow.** *The Reference Room* holds a finite set of fictional graphic studies. Filter by medium, change the overview density, open a specimen, and return to the same position. Supporting views are a text list of results and an explicit empty-result state. Pagination, deep links, and the current page remain visible.

**Mobile and motion.** Use discrete density controls instead of mandatory pinch or wheel gestures. Keep captions legible and preserve focus when returning from details. Reduced motion switches views immediately.

**Identity and effort.** Preserve overview-to-detail exploration; avoid an endless feed, hidden destinations, or costly unbounded rendering. **Effort: medium.**

## Keeping the collection genuinely varied

Review the entries as a set, not only in isolation. Compare their silhouettes at the same viewport and then inspect the content hierarchy. The following pairs are intentionally near enough to be useful alternatives; their differences must remain clear.

| Neighbouring references | Difference to preserve |
| --- | --- |
| Civic Service and Guided Journey | Finding and understanding a service versus moving through reversible choices. |
| Scholarly Folio and Literary Review | Passage-level notes and sources versus sustained essays organised into issues. |
| Editorial Newspaper and Glossy Fashion | Many stories with explicit editorial priority versus photographic cover stories and spreads. |
| Quiet Atelier and Specimen Shop | A professional practice demonstrated through projects versus purchasable objects, variants, and material detail. |
| Evidence Ledger and Operations Console | Inspecting assertions and provenance versus acting on operational records. |
| Operations Console, Project Workbench, and Observatory | Table-based exception handling, object editing with an inspector, and coordinated measures and plots. |
| Canvas Workspace and Knowledge Garden | Meaning carried by spatial arrangement versus meaning carried by text links and backlinks. |
| The Directory, Utility Storefront, and Infinite Index | Shortlisting comparable records, configuring quantities in a purchasable SKU matrix, and exploring a visual collection at several densities. |
| Grand Hotel and Documentary Story | Arrival and room selection with a booking rail versus a linear explanatory account with evidence. |
| Field Notes and Field Atlas | Field reports and preparation versus geography as the primary entry point. |
| Swiss Grid and Bauhaus Workshop | Typographic alignment and editorial scale versus geometric shapes and colour used to organise categories. |
| Bauhaus Workshop, Pop Memphis, and Playroom | Disciplined geometry, deliberate pattern clashes, and objects with visible cause and effect. |
| Scholarly Folio, Hand Drawn Desk, and Paper Cabinet | Passage-level commentary, illustrated steps with practice feedback, and classification with record retrieval. |
| Neo Brutalist Board and Raw Manifesto | Heavy outlined notices versus forceful text and direct document structure. |
| Kinetic Type and Colour Field | Typographic movement and performance versus static colour planes and proportion. |
| Pixel Arcade, Desktop 1995, Terminal Manual, and Teletext Bulletin | Game selection, named applications, technical documentation, and numbered edited bulletins. |

For each new entry, name its two closest existing neighbours and record the differences in `DESIGN.md`. A small contact sheet made from actual captured previews should reveal variety before anybody reads the labels. Use it for editorial review, not as an automated image similarity contest.

## How coding agents use the library

### Selection and adaptation process

1. **Inspect the destination.** Understand its audience, primary task, content, routes, current components, framework, and important constraints. Establish whether the request changes one screen, a public website, or an application interface.
2. **Choose a suitable reference.** If Drew names an ID, start there. Otherwise search `catalogue.json` and shortlist a few candidates based on task and content before considering mood. Choose one primary direction and explain the fit briefly.
3. **Read and look.** Read the design brief, inspect its desktop and mobile references, and inspect the source for the relevant page or interaction. A name or thumbnail alone is not enough. If an entry is still planned, state that it is a written direction without a finished specimen.
4. **Translate the design into the project.** Write a short adaptation note identifying the layout, type hierarchy, navigation, surfaces, imagery, and responsive changes. Keep the destination's content and useful architecture. Apply the philosophy rather than copying fixture content or demanding a framework migration.
5. **Build one representative route.** Choose a route that exposes the design's important decisions, including realistic long content and a useful state. Compare it with the selected reference before propagating the design across the project.
6. **Complete and verify the requested scope.** Update the other relevant routes and states, inspect desktop and phone behaviour, and check the central task. Record material departures from the reference so later work remains coherent.

Where a secondary influence is useful, state precisely what it contributes. “Use Evidence Ledger as the primary design, with Field Atlas's map/list interaction” is actionable. “Combine five references and make it modern” leaves hierarchy, typography, and behaviour unresolved. The primary reference should continue to govern the overall visual system.

### Repository instructions for agents

Keep `AGENTS.md` short and operational. It should direct agents to the catalogue and selected reference rather than embedding the whole design document into every task. Its central rules are:

- Preserve the selected design's defining traits in layout and behaviour, not just its palette.
- Inspect desktop and mobile references before changing a destination project.
- Adapt to the destination's stack and component structure; copying the demo runtime is optional.
- Retain real content, useful information hierarchy, and functioning user tasks.
- Build a representative route before repeating the treatment throughout an app.
- Keep demonstrations bounded and deterministic; add infrastructure only for a concrete requirement.
- When adding or materially changing a reference, update its brief, metadata, and captured images together.

### Example instruction for a future project

```text
Use site-design-library design 27, Blueprint Studio, as the primary design
direction for this project's public portfolio pages.

Read its DESIGN.md and tokens.css, inspect its desktop and mobile reference
images, and study the project detail specimen. Preserve the indexed drawing
sheets, aligned annotations, plan/result relationship, and technical captions.

Adapt those principles to this project's existing framework, content, and
routes. Begin with the portfolio index and one complete project page. Make the
mobile layout deliberate. Keep the project's contact flow usable and explain
any material departure from the reference in a short adaptation note.
```

### Useful starting points for Drew's projects

These are selection examples, not instructions to redesign the projects now.

| Project or need | Primary candidate | Reason |
| --- | --- | --- |
| The Daily Lobotomy essays | 07 Literary Review | Gives long arguments, issue identity, and sustained reading room to work. |
| Institutional Atlas | 10 Evidence Ledger | Makes relationships and assertions inspectable through dates, sources, and explicit evidence. |
| MediaDaddy browsing | 20 The Directory | Supports filtering, comparable metadata, and clear detail records. |
| SkillTome lessons | 34 Hand Drawn Desk | Makes examples, explanation, and feedback central to the learning interface. |
| Sleep Games presentation | 29 Calm Sanctuary | Supplies voluntary pacing and restrained presentation without turning calmness into faint text. |
| A local service client | 25 Local Trades | Puts services, prices, coverage, and contact ahead of decorative presentation. |
| A personal fan site | 39 Personal Web 1999 | Makes direct links, personal taste, and small authored pages the organising idea. |

## Construction standards and bounded verification

### Usability and accessibility

Target WCAG 2.2 AA. Check keyboard access, visible focus, labelled inputs, meaningful reading order, and alternatives for non-text information. Use the standard's contrast requirements for text. Ordinary vertical content must reflow at 320 CSS pixels; inherently two-dimensional content needs its own treatment. Account for the target-size criterion and its exceptions, and prevent sticky UI from obscuring focus. These are implementation checks, not a claim that an unfinished design already conforms. [S1]

As a project preference, make primary touch controls comfortably sized rather than reproducing tiny historical controls. Give drag, map, spatial, and canvas interactions explicit alternatives. Respect `prefers-reduced-motion` and make optional sound opt-in. When movement is central to the identity, document the equally complete static version. [S3]

Use plain link and button behaviour wherever it fits. For guided forms, the GOV.UK question-page pattern is a useful precedent for clear questions and a deliberate sequence; group closely related inputs when that makes the actual task clearer. [S6]

### Performance and asset handling

The gallery initially loads metadata and compressed thumbnails. Load live specimens, their fonts, large images, audio, and special libraries only when requested. Use responsive images, reserved image dimensions, and local assets where practical. An optional three-dimensional scene must not burden the other forty-nine references.

Use Google's current good Core Web Vitals thresholds as deployment targets: LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1, measured at the 75th percentile of real visits and assessed separately for mobile and desktop. Local or CI measurements are diagnostics; they cannot establish field performance before the site has real visitors. [S2]

Record major asset and script costs for each specimen. Set a tighter budget for plain reading and task pages than for a spatial gallery, and require a reason for expensive dependencies. Do not chase an identical score or byte count by flattening the collection's design range.

Fonts, photographs, icons, textures, illustrations, and audio require source and usage records. Prefer original content, supplied assets, or appropriately licensed material. Do not copy a commercial site's branding or proprietary artwork. The concept may be inspired by a broad tradition without becoming a clone of a specific website.

### Reference capture

Use deterministic fixture data, fixed example dates, and known state. Capture desktop at 1440 by 1000 and mobile at 390 by 844 CSS pixels as collection presets; also inspect narrow reflow and one intermediate width. These presets are project choices, not a substitute for responsive behaviour. Capture the specimen alone, wait for fonts and essential assets, and disable incidental motion. Document a deliberate representative frame for a motion centred design.

Capture a meaningful view beyond the homepage, such as a record detail, an open note, a selected map place, or a validation state. Keep images compressed and readable. Capture metadata includes the route, state, viewport, fixture identifier, and code revision so an agent can tell what it is looking at.

### Proportionate verification

Run a type check, production build, catalogue validation, and a smoke pass through ready routes. For each newly finished specimen, manually complete the primary journey, use the keyboard, check its phone layout, and inspect its important state. Use an automated accessibility scan as a supplement to those checks.

Add a focused interaction test when a failure would break the defining task: for example, a planner's conflict feedback or a reference's route restoration. Do not write exhaustive tests for decorative CSS or repeat equivalent checks across fifty static compositions. Review captured changes when a design changes intentionally; a pixel difference is information, not automatically a defect.

## Delivery sequence

### Stage 1 Build the gallery and six complete pilots

Implement the registry, inspector, isolated preview, copy prompt, comparison view, and capture workflow. Finish **01 Civic Service, 07 Literary Review, 11 Operations Console, 22 Specimen Shop, 36 Punk Zine, and 40 Desktop 1995**. Together these test task content, reading, dense work, commerce, collage, and an unusual navigation model.

Review their desktop and phone views together. If they resemble one another, correct the shared architecture or weak compositions before producing more entries. Finish the pilots' documentation and reference images so the agent workflow can be tried on a representative route in a disposable example project.

### Stage 2 Complete practical breadth

Add **02, 03, 04, 05, 06, 10, 14, 15, 18, 20, 21, 25, 29, and 41**. This brings the useful core to twenty finished references, covering product explanation, structured publishing, service websites, planning, searching, quiet experiences, and documentation.

### Stage 3 Expand editorial commerce and cultural directions

Add **08, 09, 16, 19, 23, 24, 26, 27, 28, 30, 31, 34, 35, 38, and 39**. Concentrate on content-specific structure, stronger art direction, and distinctive navigation. Review neighbouring designs together before marking them ready.

### Stage 4 Finish the playful retro and experimental collection

Add **12, 13, 17, 32, 33, 37, 42, 43, 44, 45, 46, 47, 48, 49, and 50**. The higher-effort interactions now have established conventions for states, alternatives, capture, and local fixtures. Complete their supporting views, including static or list alternatives where specified.

### Stage 5 Review the whole library

Confirm that all fifty entries are present once, ready entries have complete reference packages, and the gallery's filters and comparisons remain useful. Inspect a contact sheet and the closest-neighbour table for accidental convergence. Verify that a coding agent can locate and apply a selected reference using only the repository, without relying on this conversation.

Ship the static gallery when useful; the repository must remain usable locally and through its source files. Publication is a separate implementation action from this design specification.

## Completion criteria

The first release is complete when all fifty directions have a working specimen, a coherent written brief, documented tokens, useful captured views, and an honest status. Their main tasks work with local data. A visitor can find and compare designs, and a coding agent can retrieve a reference and adapt it to a different project.

The strongest evidence of success is variety with discipline: a service page feels direct, an operations interface feels efficient, a literary publication feels readable, a shop makes its products understandable, and the strange designs remain recognisable and usable. Each should answer a different design question well.

## Sources and further reading

The fifty concepts, proposed architecture, delivery stages, and selection rules are original design decisions for this project. The following primary documentation supports the shared implementation practices. Links were checked on 26 October 2026.

- **S1 — [W3C Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/).** The accessibility target and specific criteria should be applied to the finished implementations.
- **S2 — [Google web.dev Web Vitals](https://web.dev/articles/vitals).** Metric definitions, thresholds, field measurement, and the distinction between deployment targets and local checks.
- **S3 — [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).** Detecting and responding to the user's motion preference.
- **S4 — [Vue Single File Component CSS Features](https://vuejs.org/api/sfc-css-features.html).** Scoped styles, their transformation, and child root behaviour.
- **S5 — [Vite Features](https://vite.dev/guide/features.html).** Dynamic imports, lazy glob imports, and build chunking for loading specimens on demand.
- **S6 — [GOV.UK Design System Question pages](https://design-system.service.gov.uk/patterns/question-pages/).** Practical guidance for clear questions and task sequences.
