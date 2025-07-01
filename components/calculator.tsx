"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalculatorIcon as CalcIcon, FileText, DollarSign, Users, Building, Clock } from "lucide-react"

interface CalculationResult {
  totalGratuity: number
  firstFiveYears: number
  afterFiveYears: number
  totalServiceYears: number
  totalServiceMonths: number
  breakdown: string[]
}

export function Calculator() {
  const [basicSalary, setBasicSalary] = useState("")
  const [contractType, setContractType] = useState("")
  const [joiningDate, setJoiningDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [exitReason, setExitReason] = useState("")
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateGratuity = () => {
    if (!basicSalary || !contractType || !joiningDate || !endDate || !exitReason) {
      alert("Please fill in all fields")
      return
    }

    const salary = Number.parseFloat(basicSalary)
    const start = new Date(joiningDate)
    const end = new Date(endDate)

    // Calculate total service period
    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const totalYears = Math.floor(totalMonths / 12)
    const remainingMonths = totalMonths % 12

    if (totalMonths < 12) {
      setResult({
        totalGratuity: 0,
        firstFiveYears: 0,
        afterFiveYears: 0,
        totalServiceYears: totalYears,
        totalServiceMonths: totalMonths,
        breakdown: ["Service period less than 1 year - No gratuity applicable"],
      })
      return
    }

    let gratuity = 0
    let firstFiveYearsAmount = 0
    let afterFiveYearsAmount = 0
    const breakdown: string[] = []

    // Calculate for first 5 years (21 days per year)
    const firstFiveYears = Math.min(totalYears, 5)
    if (firstFiveYears > 0) {
      firstFiveYearsAmount = (salary / 30) * 21 * firstFiveYears
      breakdown.push(
        `First ${firstFiveYears} years: ${firstFiveYears} × 21 days = AED ${firstFiveYearsAmount.toLocaleString()}`,
      )
    }

    // Calculate for years after 5 (30 days per year)
    const afterFiveYears = Math.max(0, totalYears - 5)
    if (afterFiveYears > 0) {
      afterFiveYearsAmount = (salary / 30) * 30 * afterFiveYears
      breakdown.push(
        `After 5 years (${afterFiveYears} years): ${afterFiveYears} × 30 days = AED ${afterFiveYearsAmount.toLocaleString()}`,
      )
    }

    gratuity = firstFiveYearsAmount + afterFiveYearsAmount

    // Apply contract type and exit reason rules
    if (contractType === "limited") {
      if (exitReason === "resignation" && totalYears < 2) {
        gratuity = 0
        breakdown.push("Limited contract resignation before 2 years - No gratuity")
      } else if (exitReason === "resignation" && totalYears < 5) {
        gratuity = gratuity / 2
        breakdown.push("Limited contract resignation before 5 years - 50% gratuity")
      }
    } else if (contractType === "unlimited") {
      if (exitReason === "resignation" && totalYears < 5) {
        if (totalYears >= 1 && totalYears < 3) {
          gratuity = gratuity / 3
          breakdown.push("Unlimited contract resignation (1-3 years) - 33% gratuity")
        } else if (totalYears >= 3 && totalYears < 5) {
          gratuity = (gratuity * 2) / 3
          breakdown.push("Unlimited contract resignation (3-5 years) - 67% gratuity")
        }
      }
    }

    // Cap at 2 years salary
    const maxGratuity = salary * 24
    if (gratuity > maxGratuity) {
      gratuity = maxGratuity
      breakdown.push(`Capped at 2 years salary: AED ${maxGratuity.toLocaleString()}`)
    }

    setResult({
      totalGratuity: gratuity,
      firstFiveYears: firstFiveYearsAmount,
      afterFiveYears: afterFiveYearsAmount,
      totalServiceYears: totalYears,
      totalServiceMonths: remainingMonths,
      breakdown,
    })
  }

  return (
    <section id="calculator" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Calculate Your Gratuity</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your employment details below to get an instant, accurate calculation of your end-of-service
              benefits.
            </p>
          </div>

          <div className="relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 rounded-3xl"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>

            <div className="relative grid lg:grid-cols-2 gap-12 p-8">
              {/* Left Column - Input Form */}
              <div className="space-y-8">
                <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0 rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                        <CalcIcon className="h-6 w-6" />
                      </div>
                      Employment Details
                    </CardTitle>
                    <CardDescription className="text-blue-100 mt-2">
                      Fill in your employment information for accurate calculation
                    </CardDescription>
                  </div>

                  <CardContent className="p-8 space-y-10">
                    {/* Basic Salary */}
                    <div className="space-y-4">
                      <Label htmlFor="salary" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        Basic Monthly Salary (AED)
                      </Label>
                      <div className="relative">
                        <Input
                          id="salary"
                          type="number"
                          placeholder="e.g., 5000"
                          value={basicSalary}
                          onChange={(e) => setBasicSalary(e.target.value)}
                          className="text-xl py-4 px-6 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gradient-to-r from-gray-50 to-blue-50/30"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                          AED
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-xl border border-yellow-200">
                        💡 Enter only your basic salary, excluding allowances
                      </p>
                    </div>

                    {/* Contract Type */}
                    <div className="space-y-6">
                      <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                        Contract Type
                      </Label>
                      <RadioGroup value={contractType} onValueChange={setContractType} className="space-y-4">
                        <div className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                          <div className="relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                            <RadioGroupItem
                              value="limited"
                              id="limited"
                              className="mt-2 w-5 h-5 border-2 border-blue-500"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor="limited"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                              >
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-2">
                                  <FileText className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">Limited Contract</span>
                              </Label>
                              <p className="text-gray-600 mt-2 ml-11 leading-relaxed">
                                Fixed-term contract with specific end date. Common in free zones like JAFZA, DMCC, DDA.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                          <div className="relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                            <RadioGroupItem
                              value="unlimited"
                              id="unlimited"
                              className="mt-2 w-5 h-5 border-2 border-green-500"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor="unlimited"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                              >
                                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-2">
                                  <Clock className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">Unlimited Contract</span>
                              </Label>
                              <p className="text-gray-600 mt-2 ml-11 leading-relaxed">
                                Open-ended contract with no specific end date. More flexible for both parties.
                              </p>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Date Range */}
                    <div className="space-y-6">
                      <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        Employment Period
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="joining" className="text-base font-medium text-gray-700">
                            Joining Date
                          </Label>
                          <Input
                            id="joining"
                            type="date"
                            value={joiningDate}
                            onChange={(e) => setJoiningDate(e.target.value)}
                            className="text-lg py-4 px-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="end" className="text-base font-medium text-gray-700">
                            End Date
                          </Label>
                          <Input
                            id="end"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="text-lg py-4 px-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Exit Reason */}
                    <div className="space-y-6">
                      <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                        Reason for Leaving
                      </Label>
                      <RadioGroup value={exitReason} onValueChange={setExitReason} className="space-y-4">
                        <div className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                          <div className="relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-orange-400 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                            <RadioGroupItem
                              value="resignation"
                              id="resignation"
                              className="mt-2 w-5 h-5 border-2 border-orange-500"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor="resignation"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                              >
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-2">
                                  <Users className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">Resignation</span>
                              </Label>
                              <p className="text-gray-600 mt-2 ml-11 leading-relaxed">
                                You are voluntarily leaving your job. May affect gratuity calculation based on service
                                years.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                          <div className="relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-red-400 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                            <RadioGroupItem
                              value="termination"
                              id="termination"
                              className="mt-2 w-5 h-5 border-2 border-red-500"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor="termination"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                              >
                                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-2">
                                  <Building className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">Termination by Employer</span>
                              </Label>
                              <p className="text-gray-600 mt-2 ml-11 leading-relaxed">
                                Your employer is ending your contract. Usually qualifies for full gratuity rights.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                          <div className="relative flex items-start space-x-4 p-6 border-2 border-gray-200 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                            <RadioGroupItem
                              value="completion"
                              id="completion"
                              className="mt-2 w-5 h-5 border-2 border-green-500"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor="completion"
                                className="font-semibold cursor-pointer flex items-center gap-3 text-gray-800"
                              >
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-2">
                                  <FileText className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg">Contract Completion</span>
                              </Label>
                              <p className="text-gray-600 mt-2 ml-11 leading-relaxed">
                                Your contract term has naturally ended. Qualifies for full gratuity payment.
                              </p>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      onClick={calculateGratuity}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                      size="lg"
                    >
                      <CalcIcon className="mr-3 h-6 w-6" />
                      Calculate My Gratuity
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Results */}
              <div className="space-y-8">
                <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0 rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6">
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      Calculation Result
                    </CardTitle>
                    <CardDescription className="text-green-100 mt-2">
                      Your end-of-service gratuity calculation
                    </CardDescription>
                  </div>

                  <CardContent className="p-8">
                    {result ? (
                      <div className="space-y-8">
                        <div className="relative text-center p-8 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl border-2 border-emerald-200 overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>
                          <div className="relative">
                            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">
                              AED {result.totalGratuity.toLocaleString()}
                            </div>
                            <div className="text-lg text-gray-600 font-medium">Total Gratuity Amount</div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                            <span className="text-gray-700 font-semibold">Service Period:</span>
                            <span className="font-bold text-gray-900 text-lg">
                              {result.totalServiceYears} years, {result.totalServiceMonths} months
                            </span>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                              Calculation Breakdown
                            </h4>
                            {result.breakdown.map((item, index) => (
                              <div
                                key={index}
                                className="relative p-4 bg-gradient-to-r  rounded-2xl border-l-4 border-gradient-to-b from-blue-500 to-purple-500 shadow-sm hover:shadow-md transition-all duration-300"
                              >
                                <div className="text-gray-700 font-medium leading-relaxed">{item}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="relative p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                          <div className="flex items-start gap-3">
                            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-2 mt-1">
                              <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-yellow-800 mb-2">Important Disclaimer</p>
                              <p className="text-yellow-700 leading-relaxed">
                                This calculation is based on UAE Labour Law 2025 and MOHRE guidelines. Results are
                                estimates for informational purposes only. Consult with HR or legal advisor for specific
                                cases and final confirmation.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <div className="relative mb-8">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
                          <CalcIcon className="relative h-20 w-20 mx-auto text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-3">Ready to Calculate</h3>
                        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                          Enter your employment details and click calculate to see your gratuity amount
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600 rounded-full p-2">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-blue-900">Contract Types</h4>
              </div>
              <p className="text-sm text-blue-800">
                Limited contracts have specific end dates, while unlimited contracts are open-ended. This affects your
                gratuity calculation significantly.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-600 rounded-full p-2">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-green-900">Basic Salary Only</h4>
              </div>
              <p className="text-sm text-green-800">
                Gratuity is calculated only on your basic salary, not including housing allowance, transport, or other
                benefits.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-600 rounded-full p-2">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-purple-900">Service Years</h4>
              </div>
              <p className="text-sm text-purple-800">
                First 5 years: 21 days per year. After 5 years: 30 days per year. Maximum cap is 2 years' total salary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
