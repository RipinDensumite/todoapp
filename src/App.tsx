import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { toast } from "sonner"

function App() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (num === 10 || num === 20) {
      toast("Wowowowo please stop", {
        description: "It harming the environment, so i would like you to stop",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    }
  });

  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        <h1>{num}</h1>
        <Button onClick={() => { setNum(num + 1) }}>Click me</Button>
      </section>
    </>
  )
}

export default App
