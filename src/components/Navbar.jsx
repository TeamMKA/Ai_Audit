import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import {
    ClipboardList,
    Menu,
    Search,
    User,
    Home,
    FileText,
    BarChart,
    Settings,
    HelpCircle,
    LogOut,
} from "lucide-react"
import { Link } from "react-router-dom"
import {  image2 } from "@/assets/icons"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleSignIn = () => {
        setIsAuthenticated(true)
    }

    const handleSignOut = () => {
        setIsAuthenticated(false)
    }

    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4 md:px-6">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-4 md:hidden"
                            size="icon"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-[300px] sm:w-[400px]"
                    >
                        <SheetHeader>
                            <SheetTitle>AuditPro Navigation</SheetTitle>
                            <SheetDescription>
                                Access different sections of the auditing
                                platform.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                            <div className="space-y-4">
                                <form className="flex items-center space-x-2">
                                    <Input
                                        type="search"
                                        placeholder="Search audits..."
                                        className="flex-1"
                                    />
                                    <Button type="submit" size="icon">
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </form>
                                <div className="space-y-2">
                                    <SheetClose asChild>
                                        <Link
                                            to="/"
                                            className="flex text-black items-center space-x-2 text-base font-medium"
                                        >
                                            <Home className="h-5 w-5" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            to="/audits"
                                            className="flex text-black items-center space-x-2 text-base font-medium"
                                        >
                                            <ClipboardList className="h-5 w-5" />
                                            <span>Audits</span>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            to="/reports"
                                            className="flex text-black items-center space-x-2 text-base font-medium"
                                        >
                                            <FileText className="h-5 w-5" />
                                            <span>Reports</span>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            to="/analytics"
                                            className="flex text-black items-center space-x-2 text-base font-medium"
                                        >
                                            <BarChart className="h-5 w-5" />
                                            <span>Analytic</span>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            to="/anom"
                                            className="flex text-black items-center space-x-2 text-base font-medium"
                                        >
                                            <BarChart className="h-5 w-5" />
                                            <span>Anomalies</span>
                                        </Link>
                                    </SheetClose>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link to="/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link to="/help">
                                        <HelpCircle className="mr-2 h-4 w-4" />
                                        Help & Support
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-red-500 hover:text-red-600"
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex ml-10 items-center">
                    <Link to="/" className="flex items-center">
                        {/* <ClipboardList className="h-6 w-6 text-primary" /> */}
                        <span className="ml-2 text-lg font-semibold">
                        <img src={image2} alt="" style={{ width: '200px', height: '100px' }} />
                        </span>
                    </Link>
                </div>
                <div className="ml-auto mr-8 flex items-center space-x-4">
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <Link to="/" className="text-sm font-medium">
                            Dashboard
                        </Link>
                        <Link to="/audits" className="text-sm font-medium">
                            Audits
                        </Link>
                        <Link to="/reports" className="text-sm font-medium">
                            Reports
                        </Link>
                        <Link to="/analytics" className="text-sm font-medium">
                            Analytics
                        </Link>
                        <Link to="/anom" className="text-sm font-medium">
                            Anomalies
                        </Link>
                    </div>
                    {/* <form className="hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search audits..."
                                className="pl-8 md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           {isAuthenticated
                           ?<Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full border border-black "
                            >
                                <User className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button> 
                            :<Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full border"
                            >
                                <User className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>} 
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Help</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {isAuthenticated ? (
                                <DropdownMenuItem onClick={handleSignOut}>
                                    Log out
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={handleSignIn}>
                                    Sign in
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}
