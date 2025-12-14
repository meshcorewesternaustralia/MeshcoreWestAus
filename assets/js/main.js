async function loadLinks() {
  const list = document.getElementById("links");
  list.innerHTML = "<li class='muted'>Loading…</li>";

  try {
    const response = await fetch("data/links.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to load links.json");
    }

    const data = await response.json();
    const links = data.links || [];

    list.innerHTML = "";

    if (links.length === 0) {
      list.innerHTML = "<li class='muted'>No links configured yet.</li>";
      return;
    }

    for (const item of links) {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = item.title || item.url;

      if (item.note) {
        const note = document.createElement("small");
        note.textContent = item.note;
        a.appendChild(note);
      }

      li.appendChild(a);
      list.appendChild(li);
    }

  } catch (err) {
    console.error(err);
    list.innerHTML =
      "<li class='muted'>Error loading links. Check data/links.json.</li>";
  }
}

loadLinks();
