import { ListNews } from "./ListNews";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex items-center flex-wrap gap-6">
        <ListNews/>
      </div>
    </main>
  );
}
