export async function handleLogout(router){
    try {
        const res = await fetch("/api/logout", { method: "POST" });
        const data = await res.json();
  
        if (res.ok) {
          alert(data.message);
          router.push("/login");
        } else {
          alert("Error logout: ", data.message);
        }
      } catch (err) {
        alert(err);
        console.error(err);
      }
}