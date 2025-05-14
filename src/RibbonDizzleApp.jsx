import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sparkles, Wand2, Stars, Settings2, Music2 } from "lucide-react"

export default function RibbonDizzleApp() {
  const [selectedText, setSelectedText] = useState("")
  const [action, setAction] = useState("")
  const [tone, setTone] = useState("")
  const [modifier, setModifier] = useState("")
  const [modifiers, setModifiers] = useState([])
  const [path, setPath] = useState([])
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const actions = ["Summarize", "Translate", "Critique", "Haiku-ify"]
  const tones = ["Serious", "Psychedelic", "Snarky", "Gentle"]

  const staticModifiers = {
    "Summarize:Serious": ["Bullet points", "Key takeaways", "With citations"],
    "Critique:Snarky": ["Pop culture references", "Add meme slang", "Gently mock"],
    "Haiku-ify:Psychedelic": ["Include fractals", "Use celestial metaphors", "Add 🌈 and 🌸"]
  }

  const favoriteDizzles = [
    { name: "🌈 ZenSynth", action: "Haiku-ify", tone: "Serious", modifier: "Include fractals" },
    { name: "🧠 BrainStorminator", action: "Summarize", tone: "Psychedelic", modifier: "Expand on metaphors" },
    { name: "💔 GentleCritic", action: "Critique", tone: "Gentle", modifier: "Use examples" }
  ]

  useEffect(() => {
    const fetchDynamicModifiers = async () => {
      if (!action || !tone) return
      const key = `${action}:${tone}`
      const staticList = staticModifiers[key] || []

      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer YOUR_API_KEY`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: "You generate grammatically valid modifier options for a ribbon-style AI UI."
              },
              {
                role: "user",
                content: `Given action: '${action}' and tone: '${tone}', suggest 3 concise modifiers.`
              }
            ],
            temperature: 0.5,
            max_tokens: 100
          })
        })
        const data = await res.json()
        const aiModifiers = data.choices?.[0]?.message?.content?.split("\n").filter(Boolean) || []
        setModifiers([...staticList, ...aiModifiers])
      } catch (err) {
        console.error("Modifier AI error:", err)
        setModifiers([...staticList, "Add emoji", "Use examples", "Expand on metaphors"])
      }
    }

    fetchDynamicModifiers()
  }, [action, tone])

  const ribbonPrompt = `Please ${action} the following in a ${tone} tone${modifier ? ", and " + modifier.toLowerCase() : ""}:\n${selectedText}`

  const callOpenAI = async () => {
    setLoading(true);
    setPath([action, tone, modifier])
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer YOUR_API_KEY`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are ribbonDizzle, a funky assistant who responds with playful precision.",
            },
            {
              role: "user",
              content: ribbonPrompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 1024,
        }),
      });

      const data = await res.json();
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content);
      } else {
        setResponse("OpenAI responded, but nothing was returned.");
      }
    } catch (err) {
      console.error("OpenAI error:", err);
      setResponse("Error contacting OpenAI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <Card>
        <CardContent className="space-y-4 pt-4">
          <Textarea
            placeholder="Paste or type selected text..."
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-2">
            {actions.map((a) => (
              <Button
                key={a}
                variant={action === a ? "default" : "outline"}
                onClick={() => setAction(a)}
              >
                <Wand2 className="mr-2 h-4 w-4" /> {a}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {tones.map((t) => (
              <Button
                key={t}
                variant={tone === t ? "default" : "outline"}
                onClick={() => setTone(t)}
              >
                <Stars className="mr-2 h-4 w-4" /> {t}
              </Button>
            ))}
          </div>

          {action && tone && (
            <div className="grid grid-cols-2 gap-2">
              {modifiers.map((m) => (
                <Button
                  key={m}
                  variant={modifier === m ? "default" : "outline"}
                  onClick={() => setModifier(m)}
                >
                  <Settings2 className="mr-2 h-4 w-4" /> {m}
                </Button>
              ))}
            </div>
          )}

          <Button
            disabled={!selectedText || !action || !tone || !modifier || loading}
            onClick={callOpenAI}
          >
            {loading ? "Summoning magic..." : "Cast RibbonDizzle"}
          </Button>

          {response && (
            <div className="mt-4 border p-3 rounded-xl shadow">
              <h2 className="font-semibold mb-2 flex items-center">
                <Sparkles className="mr-2 h-5 w-5" /> ribbonDizzle speaks:
              </h2>
              <p className="whitespace-pre-wrap">{response}</p>
              <p className="mt-2 text-sm text-gray-500">Ribbon path: {path.filter(Boolean).join(" → ")}</p>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-md font-bold mb-2 flex items-center">
              <Music2 className="mr-2 h-4 w-4" /> Pinned Dizzles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {favoriteDizzles.map((fav) => (
                <Button
                  key={fav.name}
                  variant="outline"
                  onClick={() => {
                    setAction(fav.action);
                    setTone(fav.tone);
                    setModifier(fav.modifier);
                    setPath([fav.action, fav.tone, fav.modifier]);
                  }}
                >
                  {fav.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}