import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Price() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Compliance Tier */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Basic Compliance & Audit Monitoring</CardTitle>
            <p className="text-sm text-muted-foreground">For small businesses that need foundational compliance support.</p>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">$0<span className="text-lg font-normal">/month</span></div>
            <div className="space-y-2">
              <h3 className="font-semibold">Features</h3>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Access to compliance documentation templates</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Email support for compliance queries</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Auditing</h3>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Monthly self-assessment checklist</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Current Plan</Button>
          </CardFooter>
        </Card>

        {/* Professional Compliance Tier */}
        <Card className="border-primary">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Professional Compliance & Audit Monitoring</CardTitle>
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">Popular</span>
            </div>
            <p className="text-sm text-muted-foreground">For growing businesses needing comprehensive compliance solutions.</p>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">$50<span className="text-lg font-normal">/month</span></div>
            <div className="space-y-2">
              <h3 className="font-semibold">Features</h3>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Advanced compliance documentation toolkit</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Dedicated compliance manager</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Quarterly compliance review</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Auditing</h3>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Quarterly internal audit reports</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Compliance gap analysis</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Policy customization support</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Choose Professional</Button>
          </CardFooter>
        </Card>

        {/* Enterprise Compliance Tier */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Enterprise Compliance & Audit Monitoring</CardTitle>
            <p className="text-sm text-muted-foreground">For large organizations needing advanced compliance and audit features.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-semibold">Features</h3>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Custom compliance framework development</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Dedicated compliance and audit team</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Annual compliance certification</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>On-site compliance audits</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>24/7 support for compliance incidents</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Auditing</h3>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Custom audit schedules</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Regulatory audit preparation</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                <span>Real-time audit tracking</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Talk to Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}