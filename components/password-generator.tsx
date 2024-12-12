"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shuffle, Copy } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
// import { useToast } from "@/components/ui/use-toast"

export function PasswordGenerator() {
  const [type, setType] = useState("random")
  const [length, setLength] = useState(22)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState("")
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ""
    let result = ""

    switch (type) {
      case "random":
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (includeNumbers) charset += "0123456789"
        if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"
        for (let i = 0; i < length; i++) {
          result += charset.charAt(Math.floor(Math.random() * charset.length))
        }
        break
      case "memorable":
        const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon"]
        const wordCount = Math.ceil(length / 5)
        for (let i = 0; i < wordCount; i++) {
          result += words[Math.floor(Math.random() * words.length)]
          if (i < wordCount - 1) result += "-"
        }
        result = result.slice(0, length)
        break
      case "pin":
        for (let i = 0; i < length; i++) {
          result += Math.floor(Math.random() * 10).toString()
        }
        break
    }

    setPassword(result)
    toast({
      title: "Password Generated",
      description: "New password is ready.",
    })
  }

  useEffect(() => {
    generatePassword()
  }, [length, includeNumbers, includeSymbols, type])

  const copyPassword = async () => {
    if (!navigator.clipboard && !window.isSecureContext) {
      // Fallback for non-secure contexts or when Clipboard API is not available
      const textArea = document.createElement("textarea");
      textArea.value = password;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        toast({
          title: "Copied",
          description: "Password copied to clipboard.",
        });
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
        toast({
          title: "Error",
          description: "Failed to copy password. Please try again.",
          variant: "destructive",
        });
      }
      document.body.removeChild(textArea);
    } else {
      // Use Clipboard API
      try {
        await navigator.clipboard.writeText(password);
        toast({
          title: "Copied",
          description: "Password copied to clipboard.",
        });
      } catch (err) {
        console.error("Failed to copy: ", err);
        toast({
          title: "Error",
          description: "Failed to copy password. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between max-w-6xl mx-auto px-4 gap-8 lg:gap-12">
      {/* Desktop heading - hidden on mobile */}
      <div className="hidden lg:block lg:w-1/2 space-y-6">
        <h1 className="text-5xl font-semibold text-gray-800 dark:text-white leading-tight">
          Strong. Secure. Awesome. Try our random password generator.
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A powerful generator for powerful passwords to protect your online accounts.
        </p>
      </div>

      {/* Main content - full width on mobile, half width on desktop */}
      <div className="w-full lg:w-1/2">
        {/* Mobile heading - hidden on desktop */}
        <div className="block lg:hidden mb-6 space-y-4">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white leading-tight">
            Strong. Secure. Awesome. Try our random password generator.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A powerful generator for powerful passwords to protect your online accounts.
          </p>
        </div>

        <Card className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium text-gray-800 dark:text-white mb-3 block">
                Choose password type
              </Label>
              <Tabs defaultValue="random" value={type} onValueChange={setType} className="w-full">
                <TabsList className="grid w-full grid-cols-3 p-1 h-11 bg-gray-100 dark:bg-gray-600 rounded-lg">
                  <TabsTrigger value="random" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <span className="mr-2">⚡</span>
                    Random
                  </TabsTrigger>
                  <TabsTrigger value="memorable" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <span className="mr-2">🎯</span>
                    Memorable
                  </TabsTrigger>
                  <TabsTrigger value="pin" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <span className="mr-2">#</span>
                    PIN
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div>
              <Label className="text-base font-medium text-gray-800 dark:text-white mb-3 block">
                Customize your new password
              </Label>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-300">
                    <span>Characters</span>
                    <span>{length}</span>
                  </div>
                  <Slider
                    value={[length]}
                    onValueChange={(value) => setLength(value[0])}
                    max={50}
                    min={8}
                    step={1}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                  />
                </div>

                {type === "random" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="numbers" className="text-gray-600 dark:text-gray-300">Numbers</Label>
                      <Switch
                        id="numbers"
                        checked={includeNumbers}
                        onCheckedChange={setIncludeNumbers}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="symbols" className="text-gray-600 dark:text-gray-300">Symbols</Label>
                      <Switch
                        id="symbols"
                        checked={includeSymbols}
                        onCheckedChange={setIncludeSymbols}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium text-gray-800 dark:text-white mb-3 block">
                Generated password
              </Label>
              <div className="p-4 border dark:border-gray-600 rounded-lg text-center text-lg font-mono bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white break-all">
                {password}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                  onClick={copyPassword}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy password
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-2 dark:border-gray-600 dark:text-white" 
                  onClick={generatePassword}
                >
                  <Shuffle className="mr-2 h-4 w-4" />
                  Refresh password
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

