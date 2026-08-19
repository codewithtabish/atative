import Image from "next/image";
import Link from "next/link";

// Adjust these to match the real types exported alongside getAllEditorsAction.
// If the action already exports its own result/item types, prefer importing
// those directly instead of redeclaring them here.
export interface Editor {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  location: string | null;
  isActive: boolean;
  categoryCount: number;
  createdAt: string | Date;
}

export type GetAllEditorsResult =
  { success: true; editors: Editor[] } | { success: false; error?: string };

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function EditorCard({ editor }: { editor: Editor }) {
  const initials = getInitials(editor.name);

  const cardInner = (
    <>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        {editor.imageUrl ? (
          <Image
            src={editor.imageUrl}
            alt={`Portrait of ${editor.name}`}
            fill
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted" aria-hidden>
            <span className="font-serif text-3xl italic text-muted-foreground">{initials}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 pt-3">
        <h3 className="text-sm font-medium text-foreground">{editor.name}</h3>
        <p className="text-xs text-muted-foreground">
          {[
            editor.location,
            editor.categoryCount > 0
              ? `${editor.categoryCount} ${editor.categoryCount === 1 ? "beat" : "beats"}`
              : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </>
  );

  // Adjust this route if the app's public editor-profile path differs.
  const profileHref = `/editors/${editor.id}`;

  return (
    <Link
      href={profileHref}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {cardInner}
    </Link>
  );
}

export async function EditorialTeam({
  fetchEditors,
}: {
  // Pass getAllEditorsAction in from the page (server action), so this
  // component stays easy to test and doesn't hardcode the data source.
  fetchEditors: () => Promise<GetAllEditorsResult>;
}) {
  const result = await fetchEditors();
  const editors = result.success ? result.editors : [];
  const activeEditors = editors.filter((editor) => editor.isActive);

  if (activeEditors.length === 0) {
    return (
      <p className="max-w-md text-sm text-muted-foreground">
        Our editorial roster is being updated. Check back shortly to meet the people behind Alentah.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {activeEditors.map((editor) => (
        <EditorCard key={editor.id} editor={editor} />
      ))}
    </div>
  );
}
