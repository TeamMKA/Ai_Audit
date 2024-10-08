/* eslint-disable no-unused-vars */
import { Link, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/service/firebase.js"

import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"

export const description =
    "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."

export function DashBoards() {
    const [findings, setFindings] = useState([]) // State to hold anomaly data
    const [loading, setLoading] = useState(true) // Loading state

    const fetchAnomalyData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "anomaly"))
            const anomalyData = querySnapshot.docs.map((doc) => ({
                id: doc.id, // Using document ID as the finding ID
                ...doc.data(), // Spread operator to get all fields
            }))

            console.log(anomalyData)

            setFindings(anomalyData)
        } catch (error) {
            console.error("Error fetching anomaly data: ", error)
        } finally {
            setLoading(false) // Set loading to false after data fetch
        }
    }

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchAnomalyData()
    }, [])

    const handleAudit = () => {
        console.log("Audit")
        ;<Navigate to="/upload" />
    }
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {/* Left hand side tab */}
            {/* <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          </TooltipProvider>


          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
          </TooltipProvider>

        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          </TooltipProvider>
        </nav>
      </aside> */}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="sm:hidden"
                            >
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>

                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>

                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card
                                className="sm:col-span-2"
                                x-chunk="dashboard-05-chunk-0"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle>Your Transactions</CardTitle>
                                    <CardDescription className="text-balance max-w-lg leading-relaxed">
                                        Introducing Our Dynamic Transactions
                                        Dashboard for Seamless Management and
                                        Insightful Analysis.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button>
                                        {" "}
                                        <Link to={"/upload"}>
                                            Audit New Transactions
                                        </Link>{" "}
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription>This Week</CardDescription>
                                    <CardTitle className="text-4xl">
                                        ₹ 500K
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +25% from last week
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress
                                        value={25}
                                        aria-label="25% increase"
                                    />
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>
                                        This Month
                                    </CardDescription>
                                    <CardTitle className="text-4xl">
                                        ₹1500K
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +10% from last month
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress
                                        value={12}
                                        aria-label="12% increase"
                                    />
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs defaultValue="week">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="week">Week</TabsTrigger>
                                    <TabsTrigger value="month">
                                        Month
                                    </TabsTrigger>
                                    <TabsTrigger value="year">Year</TabsTrigger>
                                </TabsList>
                                <div className="ml-auto flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 gap-1 text-sm"
                                            >
                                                <ListFilter className="h-3.5 w-3.5" />
                                                <span className="sr-only sm:not-sr-only">
                                                    Filter
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Filter by
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuCheckboxItem checked>
                                                Fulfilled
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Declined
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Refunded
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">
                                            Export
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <TabsContent value="week">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>
                                            Recent Transactions
                                        </CardTitle>
                                        <CardDescription>
                                            Recent set of transactions made.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Amount
                                                    </TableHead>
                                                    <TableHead>ID</TableHead>
                                                    <TableHead>
                                                        Category
                                                    </TableHead>
                                                    <TableHead>
                                                        Description
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {findings.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {item.amount}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.category}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.description}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div>
                        <Card
                            className="overflow-hidden"
                            x-chunk="dashboard-05-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-start bg-muted/50">
                                <div className="grid gap-0.5">
                                    <CardTitle className="group flex items-center gap-2 text-lg">
                                        Transaction Id: hgAXZkypyuR1zJF3C5TS
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only">
                                                Copy Order ID
                                            </span>
                                        </Button>
                                    </CardTitle>
                                    <CardDescription>
                                        Date: November 23, 2023
                                    </CardDescription>
                                </div>
                                <div className="ml-auto flex items-center gap-1">
                                    {/* <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 gap-1"
                                    >
                                        <Truck className="h-3.5 w-3.5" />
                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            Track Order
                                        </span>
                                    </Button> */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-8 w-8"
                                            >
                                                <MoreVertical className="h-3.5 w-3.5" />
                                                <span className="sr-only">
                                                    More
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Export
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                Trash
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 text-sm">
                                {/* <div className="grid gap-3">
                                    <div className="font-semibold">
                                        Order Details
                                    </div>
                                    <ul className="grid gap-3">
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Glimmer Lamps x <span>2</span>
                                            </span>
                                            <span>$250.00</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Aqua Filters x <span>1</span>
                                            </span>
                                            <span>$49.00</span>
                                        </li>
                                    </ul>
                                    <Separator className="my-2" />
                                    <ul className="grid gap-3">
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Subtotal
                                            </span>
                                            <span>$299.00</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Shipping
                                            </span>
                                            <span>$5.00</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Tax
                                            </span>
                                            <span>$25.00</span>
                                        </li>
                                        <li className="flex items-center justify-between font-semibold">
                                            <span className="text-muted-foreground">
                                                Total
                                            </span>
                                            <span>$329.00</span>
                                        </li>
                                    </ul>
                                </div>

                                <Separator className="my-4" />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <div className="font-semibold">
                                            Shipping Information
                                        </div>
                                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                                            <span>Liam Johnson</span>
                                            <span>1234 Main St.</span>
                                            <span>Anytown, CA 12345</span>
                                        </address>
                                    </div>
                                    <div className="grid auto-rows-max gap-3">
                                        <div className="font-semibold">
                                            Billing Information
                                        </div>
                                        <div className="text-muted-foreground">
                                            Same as shipping address
                                        </div>
                                    </div>
                                </div> */}

                                <Separator className="my-4" />

                                <div className="grid gap-3">
                                    <div className="font-semibold">
                                        Customer Information
                                    </div>
                                    <dl className="grid gap-3">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">
                                                Customer
                                            </dt>
                                            <dd>Rufus Hilpert</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">
                                                Email
                                            </dt>
                                            <dd>
                                                <a href="mailto:">
                                                    Rufus@acme.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">
                                                Phone
                                            </dt>
                                            <dd>
                                                <a href="tel:">
                                                    +1 234 567 890
                                                </a>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <Separator className="my-4" />

                                <div className="grid gap-3">
                                    <div className="font-semibold">
                                        Payment Information
                                    </div>
                                    <dl className="grid gap-3">
                                        <div className="flex items-center justify-between">
                                            <dt className="flex items-center gap-1 text-muted-foreground">
                                                <CreditCard className="h-4 w-4" />
                                                Visa
                                            </dt>
                                            <dd>**** **** **** 4532</dd>
                                        </div>
                                    </dl>
                                </div>

                                <Separator className="my-4" />

                                <div className="grid gap-3">
                                    <div className="font-semibold">
                                        Transaction Information
                                    </div>
                                    <dl className="grid gap-3">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">
                                                Transaction Type
                                            </dt>
                                            <dd>Research Grant</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">
                                                Amount
                                            </dt>
                                            <dd>$557.40</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">
                                                Department
                                            </dt>
                                            <dd>Research</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">
                                                Recipient
                                            </dt>
                                            <dd>Rufus Hilpert</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">
                                                Status
                                            </dt>
                                            <dd>Pending</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">
                                                Transaction Date
                                            </dt>
                                            <dd>October 6, 2024, 7:53:19 AM</dd>
                                        </div>
                                    </dl>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                                <div className="text-xs text-muted-foreground">
                                    Updated{" "}
                                    <time dateTime="2023-11-23">
                                        November 23, 2023
                                    </time>
                                </div>
                                <Pagination className="ml-auto mr-0 w-auto">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-6 w-6"
                                            >
                                                <ChevronLeft className="h-3.5 w-3.5" />
                                                <span className="sr-only">
                                                    Previous Order
                                                </span>
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-6 w-6"
                                            >
                                                <ChevronRight className="h-3.5 w-3.5" />
                                                <span className="sr-only">
                                                    Next Order
                                                </span>
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
