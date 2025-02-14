export function Welcome() {
    return (
        <main className="flex flex-col items-center justify-center pt-16 pb-4 gap-2">
            <h1 className="text-4xl font-bold text-center">Welcome to MaListe+</h1>
            <p className="text-sm text-muted-foreground">
                MaListe+ is an app written in React + PHP to handle your shopping list.
            </p>
        </main>
    );
}