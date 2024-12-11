"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shuffle } from 'lucide-react'

export function PasswordGenerator() {
  const [type, setType] = useState("random")
  const [length, setLength] = useState(20)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef<HTMLDivElement>(null)

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
  }

  useEffect(() => {
    generatePassword()
  }, [length, includeNumbers, includeSymbols, type])

  const copyPassword = async () => {
    if (passwordRef.current) {
      await navigator.clipboard.writeText(passwordRef.current.textContent || '')
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center max-w-6xl mx-auto px-4">
        <div className="w-full lg:w-1/2 space-y-4 md:space-y-6 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-800 dark:text-white leading-tight">
            Strong. Secure. Awesome. Try our random password generator.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-white/80">
            A powerful generator for powerful passwords to protect your online accounts.
          </p>
        </div>
        <Card className="w-full lg:w-1/2 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
          <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-4">
              <Label className="text-base md:text-lg text-gray-700 dark:text-gray-200">Choose password type</Label>
              <Tabs defaultValue="random" value={type} onValueChange={setType}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="random">
                    <span className="mr-2">⚡</span>
                    Random
                  </TabsTrigger>
                  <TabsTrigger value="memorable">
                    <span className="mr-2">🎯</span>
                    Memorable
                  </TabsTrigger>
                  <TabsTrigger value="pin">
                    <span className="mr-2">#</span>
                    PIN
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2 md:space-y-4">
              <Label className="text-base md:text-lg text-gray-700 dark:text-gray-200">Customize your new password</Label>
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Characters</span>
                    <span>{length}</span>
                  </div>
                  <Slider
                    value={[length]}
                    onValueChange={(value) => setLength(value[0])}
                    max={50}
                    min={8}
                    step={1}
                    className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
                  />
                </div>

                {type === "random" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="numbers" className="text-gray-700 dark:text-gray-200">Numbers</Label>
                      <Switch
                        id="numbers"
                        checked={includeNumbers}
                        onCheckedChange={setIncludeNumbers}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="symbols" className="text-gray-700 dark:text-gray-200">Symbols</Label>
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

            <div className="space-y-2 md:space-y-4">
              <Label className="text-base md:text-lg text-gray-700 dark:text-gray-200">Generated password</Label>
              <div ref={passwordRef} className="p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-center text-base md:text-xl font-mono break-all bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                {password}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-3" onClick={copyPassword}>
                  Copy password
                </Button>
                <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white py-2 md:py-3" onClick={generatePassword}>
                  <Shuffle className="mr-2 h-4 w-4" />
                  Refresh password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

