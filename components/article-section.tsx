import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Calculator,
    FileText,
    Users,
    Building,
    AlertTriangle,
    CheckCircle,
    Clock,
} from "lucide-react";

export function ArticleSection() {
    return (
        <section id="guide" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Complete Guide to UAE Gratuity
                        </h2>
                        <p className="text-lg text-gray-600">
                            Everything you need to know about end-of-service
                            benefits in the UAE
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* What is Gratuity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    What Is Gratuity in UAE?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    Gratuity in UAE is a legally mandated end of
                                    service benefit provided to employees after
                                    their job contract ends. As per UAE Labour
                                    Law 2025 and MOHRE guidelines, gratuity is
                                    calculated as a lump sum amount based on the
                                    employee's basic salary and total years of
                                    service. This benefit applies to employees
                                    working under both limited and unlimited
                                    contracts.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    End of service gratuity is not a bonus or
                                    company gift — it's a financial right. It is
                                    especially important for expats and private
                                    sector employees, including domestic workers
                                    and those working in free zones such as
                                    JAFZA, DMCC, and DDA. Employees become
                                    eligible for gratuity once they complete a
                                    minimum of 1 year of continuous service.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Calculation Formula */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calculator className="h-5 w-5" />
                                    Gratuity Calculation Formula
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                                    <h4 className="font-semibold text-blue-900 mb-4">
                                        Official UAE Gratuity Formula:
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary">
                                                First 5 Years
                                            </Badge>
                                            <span className="text-gray-700">
                                                21 days' basic salary x number
                                                of years worked
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary">
                                                After 5 Years
                                            </Badge>
                                            <span className="text-gray-700">
                                                30 days' basic salary x number
                                                of years beyond 5
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="destructive">
                                                Maximum Cap
                                            </Badge>
                                            <span className="text-gray-700">
                                                Total gratuity cannot exceed 2
                                                years' total salary
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    This formula is valid across Dubai, Abu
                                    Dhabi, and all emirates, including free
                                    zones like JAFZA, DMCC, and DDA. Whether
                                    you're a private employee, domestic worker,
                                    or working under a limited/unlimited
                                    contract, this end of service benefit
                                    formula ensures fair calculation.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Contract Types */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Limited vs Unlimited Contract Rules
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-green-50 p-6 rounded-lg">
                                        <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            Limited Contract
                                        </h4>
                                        <ul className="space-y-2 text-sm text-green-800">
                                            <li>
                                                • Gratuity is fully paid if you
                                                complete the contract duration
                                            </li>
                                            <li>
                                                • Early resignation may result
                                                in reduced or no gratuity
                                            </li>
                                            <li>
                                                • Termination by employer
                                                (without misconduct) = full
                                                gratuity
                                            </li>
                                            <li>
                                                • Common in free zones like
                                                JAFZA, DMCC, and DDA
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-6 rounded-lg">
                                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Unlimited Contract
                                        </h4>
                                        <ul className="space-y-2 text-sm text-blue-800">
                                            <li>
                                                • More flexible for both
                                                employee and employer
                                            </li>
                                            <li>
                                                • Resignation after 1 year but
                                                before 5 years = reduced
                                                gratuity
                                            </li>
                                            <li>
                                                • After 5 years, gratuity is
                                                paid fully according to law
                                            </li>
                                            <li>
                                                • Termination without valid
                                                reason = full gratuity rights
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Domestic Workers */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Gratuity for Domestic Workers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Domestic workers in the UAE — including
                                    housemaids, drivers, nannies, and cleaners —
                                    are also entitled to end of service gratuity
                                    under the updated UAE Labour Law 2025 and
                                    MOHRE regulations.
                                </p>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <h5 className="font-medium text-yellow-900 mb-2">
                                        Eligibility Requirements:
                                    </h5>
                                    <ul className="text-sm text-yellow-800 space-y-1">
                                        <li>
                                            • Must complete at least one full
                                            year of continuous service
                                        </li>
                                        <li>
                                            • Same calculation formula as other
                                            private employees
                                        </li>
                                        <li>
                                            • Applies to all emirates including
                                            Dubai and Abu Dhabi
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Free Zones */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5" />
                                    Free Zone Gratuity (JAFZA, DMCC, DDA)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Employees working in UAE free zones like
                                    JAFZA (Jebel Ali Free Zone), DMCC (Dubai
                                    Multi Commodities Centre), and DDA (Dubai
                                    Development Authority) are also fully
                                    entitled to end of service gratuity,
                                    governed by UAE's Federal Labour Law unless
                                    their zone has a unique clause.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="font-semibold text-gray-900">
                                            JAFZA
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Jebel Ali Free Zone
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="font-semibold text-gray-900">
                                            DMCC
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Dubai Multi Commodities
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="font-semibold text-gray-900">
                                            DDA
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Dubai Development Authority
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Common Mistakes */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5" />
                                    Common Calculation Mistakes to Avoid
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div>
                                                <div className="font-medium text-red-900">
                                                    Using Total Salary
                                                </div>
                                                <div className="text-sm text-red-700">
                                                    Only basic salary counts,
                                                    not allowances
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div>
                                                <div className="font-medium text-red-900">
                                                    Ignoring Contract Type
                                                </div>
                                                <div className="text-sm text-red-700">
                                                    Limited vs unlimited affects
                                                    calculation
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div>
                                                <div className="font-medium text-red-900">
                                                    Wrong Service Period
                                                </div>
                                                <div className="text-sm text-red-700">
                                                    Include partial years in
                                                    calculation
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div>
                                                <div className="font-medium text-red-900">
                                                    Outdated MOHRE Rules
                                                </div>
                                                <div className="text-sm text-red-700">
                                                    Always use latest 2025
                                                    guidelines
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div>
                                                <div className="font-medium text-red-900">
                                                    Unpaid Leave Impact
                                                </div>
                                                <div className="text-sm text-red-700">
                                                    Unpaid leaves can reduce
                                                    service period
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div>
                                                <div className="font-medium text-red-900">
                                                    Special Categories
                                                </div>
                                                <div className="text-sm text-red-700">
                                                    Different rules for domestic
                                                    workers
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tax Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Is Gratuity Taxable in UAE?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <div className="flex items-center gap-3 mb-3">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                        <h4 className="font-semibold text-green-900">
                                            Good News: Gratuity is Tax-Free!
                                        </h4>
                                    </div>
                                    <p className="text-green-800 mb-4">
                                        The UAE is a tax-free country when it
                                        comes to personal income, and this
                                        includes your end of service gratuity.
                                        Whether you're working in Dubai, Abu
                                        Dhabi, Sharjah, or any other emirate,
                                        your gratuity payout is 100% tax-exempt.
                                    </p>
                                    <div className="text-sm text-green-700">
                                        <strong>Important:</strong> If you're
                                        planning to transfer the amount abroad,
                                        check if your home country applies any
                                        tax on foreign income or remittances.
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
