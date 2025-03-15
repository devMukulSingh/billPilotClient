import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useLocation, useNavigate, Link, redirect, useSearchParams, useParams } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { rootAuthLoader, getAuth } from "@clerk/remix/ssr.server";
import { ClerkApp, SignIn, SignUp, useClerk, SignedIn, UserButton, SignedOut, useAuth } from "@clerk/remix";
import { QueryClient, useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast$1, { toast, Toaster } from "react-hot-toast";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import * as React from "react";
import React__default, { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PlusCircle, ScrollText, ShoppingBagIcon, Package, Search, ChevronRight, Check, Circle, X, Edit, Trash, ChevronUp, ChevronDown, Menu, Plus, ChevronLeft, CalendarIcon, ShoppingBag } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useReactTable, getPaginationRowModel, getExpandedRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext, FormProvider, Controller, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
const loader$1 = (args) => rootAuthLoader(args);
function Layout({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError(error) {
          if (error.response.status !== 500)
            toast.error(error.response.data.error);
          else toast.error(`Ineternal server error`);
          console.error(error);
        }
      },
      queries: {
        gcTime: 24 * 60 * 1e3,
        // 24 hours
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  });
  const persister = createSyncStoragePersister({
    storage: typeof window !== "undefined" ? window.localStorage : null
  });
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "max-h-screen  overflow-hidden", children: [
      /* @__PURE__ */ jsx(Toaster, {}),
      /* @__PURE__ */ jsx(
        PersistQueryClientProvider,
        {
          persistOptions: { persister },
          client: queryClient,
          children
        }
      ),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const root = ClerkApp(App, {
  signUpForceRedirectUrl: "/create-bill",
  signInFallbackRedirectUrl: "/create-bill"
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root,
  links,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function Page$1() {
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen w-full items-center justify-center", children: /* @__PURE__ */ jsx(
    SignIn,
    {}
  ) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$1
}, Symbol.toStringTag, { value: "Module" }));
function Page() {
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen w-full items-center justify-center", children: /* @__PURE__ */ jsx(SignUp, {}) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-violet-800 text-primary-foreground shadow hover:bg-violet-800/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
function NavLinks({}) {
  const location = useLocation();
  const navlinks = [
    {
      title: "HOME",
      isActive: location.pathname === "/home"
    },
    {
      title: "FEATURES",
      isActive: location.pathname === "/features"
    },
    {
      title: "CONTACT",
      isActive: location.pathname === "/contact"
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "flex gap-5", children: navlinks.map((nav, index) => /* @__PURE__ */ jsx(
    "h1",
    {
      className: "cursor-pointer font-medium",
      children: nav.title
    },
    index
  )) });
}
function Navbar({}) {
  const { openSignIn, openSignUp } = useClerk();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\r\n    flex \r\n    items-center \r\n    justify-between\r\n    h-20\r\n    w-screen\r\n    bg-violet-600\r\n    sticky\r\n    top-0\r\n    p-5\r\n    text-white\r\n    ",
      children: [
        /* @__PURE__ */ jsx("img", { className: "h-32 w-32 object-contain", src: "/logo-dark.png" }),
        /* @__PURE__ */ jsx(NavLinks, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsxs(SignedIn, { children: [
            /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/create-bill"), children: "Open the App" }),
            /* @__PURE__ */ jsx(UserButton, {})
          ] }),
          /* @__PURE__ */ jsxs(SignedOut, { children: [
            /* @__PURE__ */ jsx(Button, { onClick: () => openSignIn(), children: "Login" }),
            /* @__PURE__ */ jsx(
              Button,
              {
                className: "text-black",
                variant: "outline",
                onClick: () => openSignUp(),
                children: "SignUp"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function IndexLayout({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "font-sans bg-obcPrimary ", children: /* @__PURE__ */ jsx(Navbar, {}) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IndexLayout
}, Symbol.toStringTag, { value: "Module" }));
function Navlinks({}) {
  const location = useLocation();
  const navlinks = [
    {
      title: "Create bill",
      link: "/create-bill",
      isActive: location.pathname === "/create-bill",
      icon: PlusCircle
    },
    {
      title: "All bills",
      link: "/bills",
      isActive: location.pathname === "/bills",
      icon: ScrollText
    },
    {
      title: "Products",
      link: "/products",
      isActive: location.pathname === "/products",
      icon: ShoppingBagIcon
    },
    {
      title: "Domains",
      link: "/domain",
      isActive: location.pathname === "/domain",
      icon: Package
    },
    {
      title: "Distributors",
      link: "/distributor",
      isActive: location.pathname === "/distributor",
      icon: Package
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "flex w-full flex-col gap-2", children: navlinks.map((navlink, index) => /* @__PURE__ */ jsxs(
    Link,
    {
      className: `
            flex
            px-5
            py-2
            gap-2
            md:justify-normal
            justify-center
            hover:bg-violet-400
            ${navlink.isActive ? "bg-violet-400" : ""}
           `,
      to: navlink.link,
      children: [
        /* @__PURE__ */ jsx(navlink.icon, {}),
        /* @__PURE__ */ jsx("h1", { className: "md:block hidden", children: navlink.title })
      ]
    },
    index
  )) });
}
function Sidebar({}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\n    flex \n    bg-violet-500 \n    text-white \n    flex-col \n    gap-5 \n    h-screen \n    sticky \n    left-0 \n    top-0\n    w-[5rem]  \n    items-center\n    md:items-stretch\n    md:w-[15rem]\n    ",
      children: [
        /* @__PURE__ */ jsxs(
          "header",
          {
            className: "flex\n       gap-2 \n       items-center \n       justify-between  \n      px-5\n      py-5\n      ",
            children: [
              /* @__PURE__ */ jsx(Link, { className: "md:block hidden", to: "/", children: /* @__PURE__ */ jsx(
                "img",
                {
                  className: "h-20  w-20 object-contain",
                  src: "/logo-dark.png",
                  alt: "logo"
                }
              ) }),
              /* @__PURE__ */ jsx(UserButton, {})
            ]
          }
        ),
        /* @__PURE__ */ jsx(Navlinks, {})
      ]
    }
  );
}
const loader = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  return {};
};
function RootLayout({}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex max-h-screen ", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "     \n        w-[calc(100vw-5rem)] \n        bg-slate-200\n        md:w-[calc(100vw-15rem)] \n\n      ",
        children: /* @__PURE__ */ jsx(Outlet, {})
      }
    )
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RootLayout,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
function Header$3({}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "\n      flex\n      items-center \n      h-16\n      px-5 \n      bg-slate-300\n     ",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "\n      flex \n      items-center\n      gap-2\n      w-auto \n      md:w-1/3 \n      border \n      bg-white\n      rounded-lg\n      sticky\n      top-0\n      px-2\n      ",
          children: [
            /* @__PURE__ */ jsx(Search, {}),
            /* @__PURE__ */ jsx(
              Input,
              {
                className: "\n      focus-visible:ring-0 \n      border-0\n      ",
                placeholder: "Search"
              }
            )
          ]
        }
      )
    }
  );
}
function BillLayout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: " bg-slate-200", children: [
    /* @__PURE__ */ jsx(Header$3, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BillLayout
}, Symbol.toStringTag, { value: "Module" }));
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function DataTable({
  columns: columns2,
  data,
  className,
  renderSubComponent,
  totalPages
}) {
  var _a;
  const [searchParams] = useSearchParams();
  Number(searchParams.get("page")) || 1;
  const table = useReactTable({
    data: data || [],
    columns: columns2,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    getPaginationRowModel: getPaginationRowModel(),
    manualFiltering: true,
    manualPagination: true,
    initialState: {
      pagination: {
        pageIndex: 1,
        //custom initial page index
        pageSize: 10
        //custom default page size
      }
    }
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        className,
        `px-5 rounded-md flex flex-col  gap-5 `
      ),
      children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
            return /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : flexRender(
              header.column.columnDef.header,
              header.getContext()
            ) }, header.id);
          }) }, headerGroup.id)) }),
          /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
            /* @__PURE__ */ jsx(
              TableRow,
              {
                "data-state": row.getIsSelected() && "selected",
                children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                ) }, cell.id))
              },
              row.id
            ),
            row.getIsExpanded() && /* @__PURE__ */ jsx(TableRow, { className: "bg-white hover:bg-neutral-100", children: /* @__PURE__ */ jsx(TableCell, { align: "right", colSpan: 2, children: renderSubComponent({ row }) }) })
          ] }, row.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: columns2.length, className: "h-24 text-center", children: "No results." }) }) })
        ] }),
        totalPages && /* @__PURE__ */ jsx(PaginationButtons, { totalPages, table })
      ]
    }
  );
}
function PaginationButtons({
  table,
  totalPages
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  return /* @__PURE__ */ jsxs("div", { className: " flex justify-center gap-5 mt-auto", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => setSearchParams({ page: "1" }),
        disabled: page === 1,
        children: "<<"
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => setSearchParams({ page: `${page - 1}` }),
        disabled: page === 1,
        children: "<"
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => setSearchParams({ page: `${page + 1}` }),
        disabled: totalPages === page,
        children: ">"
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => setSearchParams({ page: totalPages.toString() }),
        disabled: totalPages === page,
        children: ">>"
      }
    )
  ] });
}
const columns = [
  {
    accessorKey: "product.name",
    header: "Name"
  },
  {
    accessorKey: "product.rate",
    header: "Rate"
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    accessorKey: "amount",
    header: "Amount"
  }
];
function ItemsTable({ row }) {
  const data = row.original.bill_items;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    DataTable,
    {
      columns,
      data,
      renderSubComponent: () => /* @__PURE__ */ jsx(Fragment, {})
    }
  ) });
}
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const DialogModal = ({
  children,
  title = "",
  onClose,
  open,
  description = "",
  dialogContentClassName,
  innerDivClassName,
  titleIcon
}) => {
  const onChange = () => {
    if (open) onClose();
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: onChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: dialogContentClassName, children: [
    /* @__PURE__ */ jsxs(DialogTitle, { className: "flex gap-2", children: [
      " ",
      title,
      " "
    ] }),
    /* @__PURE__ */ jsxs(DialogDescription, { className: "", children: [
      description,
      " "
    ] }),
    /* @__PURE__ */ jsx("div", { className: innerDivClassName, children })
  ] }) });
};
function DeleteDialog({
  onClose,
  open,
  title,
  description,
  onDelete,
  disabled
}) {
  return /* @__PURE__ */ jsxs(
    DialogModal,
    {
      dialogContentClassName: "w-[20rem]",
      innerDivClassName: "flex justify-between",
      open,
      title,
      onClose,
      description,
      children: [
        /* @__PURE__ */ jsx(Button, { type: "button", disabled, onClick: onDelete, variant: "destructive", children: "Delete" }),
        /* @__PURE__ */ jsx(Button, { disabled, onClick: onClose, children: "Cancel" })
      ]
    }
  );
}
const BASE_URL_SERVER = process.env.NODE_ENV === "production" ? "https://billmanagementserver.onrender.com" : `http://localhost:8000/api/v1`;
const ITEM_INITIAL_VALUES = {
  product: {
    id: "",
    rate: 0,
    name: ""
  },
  product_id: "",
  amount: 0,
  quantity: 1
};
function TableActionsDropdown$3({
  children,
  bill,
  isOpenDialog,
  setIsOpenDialog
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { isPending, mutate } = useMutation({
    mutationKey: ["delete_bill"],
    mutationFn: async (data) => {
      await axios.delete(
        `${BASE_URL_SERVER}/${userId}/bill/${data.id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_bills"] });
      setIsOpenDialog(false);
      toast$1.success("bill deleted");
    }
  });
  const dropdownOptions = [
    {
      label: "Edit",
      icon: Edit,
      onSelect: () => navigate(`/edit-bill/${bill.id}`),
      className: ""
    },
    {
      label: "Delete",
      icon: Trash,
      onSelect: () => setIsOpenDialog(true),
      className: ""
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isOpenDialog && /* @__PURE__ */ jsx(
      DeleteDialog,
      {
        disabled: isPending,
        onDelete: () => mutate({ id: bill.id }),
        description: "This action can't be undone",
        open: isOpenDialog,
        onClose: () => setIsOpenDialog(false),
        title: "Are you sure?"
      }
    ),
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children }),
      /* @__PURE__ */ jsx(DropdownMenuContent, { className: "", children: /* @__PURE__ */ jsx(DropdownMenuGroup, { children: dropdownOptions.map((option, index) => /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          className: cn(
            `flex items-center gap-2 cursor-pointer`,
            option.className
          ),
          onClick: option.onSelect,
          children: [
            /* @__PURE__ */ jsx(option.icon, { size: 15 }),
            option.label
          ]
        },
        index
      )) }) })
    ] })
  ] });
}
function Bills({}) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const { userId } = useAuth();
  const { data, isFetching, isPending } = useQuery({
    queryKey: ["get_bills"],
    queryFn: async () => {
      return (await axios.get(`${BASE_URL_SERVER}/${userId}/bill/get-bills`, {
        params: { page, limit }
      })).data;
    }
  });
  const columns2 = [
    {
      accessorKey: "distributor.id",
      header: "id"
    },
    {
      accessorKey: "distributor.name",
      header: "Distributor"
    },
    {
      accessorKey: "domain.name",
      header: "Domain"
    },
    {
      accessorKey: "expander",
      header: "Products",
      cell: ({ row }) => {
        var _a, _b;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            ...{
              onClick: row.getToggleExpandedHandler(),
              className: "flex gap-3"
            },
            children: [
              (_b = (_a = row.original) == null ? void 0 : _a.bill_items) == null ? void 0 : _b.length,
              row.getIsExpanded() ? /* @__PURE__ */ jsx(ChevronUp, {}) : /* @__PURE__ */ jsx(ChevronDown, {})
            ]
          }
        );
      }
    },
    {
      accessorKey: "total_amount",
      header: "Total amount",
      cell: ({ row }) => `₹${row.original.total_amount}`
    },
    {
      accessorKey: "is_paid",
      header: "Paid",
      cell: ({ row }) => row.getValue("is_paid") ? "Yes" : "No"
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => format(row.getValue("date"), "dd-MM-yyyy | H:m")
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx(
          TableActionsDropdown$3,
          {
            bill: row.original,
            isOpenDialog,
            setIsOpenDialog,
            children: /* @__PURE__ */ jsx(Menu, { className: "cursor-pointer" })
          }
        );
      }
    }
  ];
  const totalPages = Math.ceil(((data == null ? void 0 : data.count) || 1) / limit);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\n        flex-col\n        gap-5\n        flex\n        h-full border-2\n        ",
      children: [
        /* @__PURE__ */ jsxs("header", { className: "space-y-2 p-5", children: [
          /* @__PURE__ */ jsxs(
            "h1",
            {
              className: "\n            sm:text-3xl \n            text-2xl \n            font-medium\n            text-neutral-800\n            flex\n            items-center\n            gap-2\n            border-2\n        ",
              children: [
                /* @__PURE__ */ jsx(Package, {}),
                "All Bills"
              ]
            }
          ),
          /* @__PURE__ */ jsx(Separator, { className: "border-white border" })
        ] }),
        isFetching || isPending ? /* @__PURE__ */ jsx(Fragment, { children: "loading..." }) : /* @__PURE__ */ jsx(
          DataTable,
          {
            className: "min-h-[calc(100vh-12rem)]",
            columns: columns2,
            data: (data == null ? void 0 : data.data) || [],
            totalPages,
            renderSubComponent: ItemsTable
          }
        )
      ]
    }
  ) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bills
}, Symbol.toStringTag, { value: "Module" }));
const billSchema = z.object({
  distributor_id: z.string({
    required_error: "Distributor Id is required"
  }).trim().min(1, {
    message: "Distributor Id is required"
  }),
  domain_id: z.string({
    required_error: "domain Id is required"
  }).trim().min(1, {
    message: "domain Id is required"
  }),
  distributor_name: z.string({
    required_error: "Distributor name is required"
  }).trim().min(1, {
    message: "Distributor name is required"
  }).max(30, {
    message: "Max 30 characters allowed"
  }),
  domain_name: z.string({
    required_error: "domain name is required"
  }).trim().min(1, {
    message: "domain name is required"
  }).max(30, {
    message: "Max 30 characters allowed"
  }),
  date: z.date({ required_error: "Date is required" }),
  is_paid: z.boolean().default(false),
  bill_items: z.object({
    id: z.string().optional(),
    product: z.object({
      rate: z.coerce.number({ required_error: "Rate is required" }),
      id: z.string().optional()
    }),
    product_id: z.string({ required_error: "Product is required" }),
    quantity: z.coerce.number({
      required_error: "quantity is required",
      invalid_type_error: "Only numbers allowed"
    }),
    amount: z.coerce.number({
      required_error: "amount is required",
      invalid_type_error: "Only numbers allowed"
    })
  }).array().min(1, { message: "Atleast one product is required" })
});
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx("div", { ref, className: cn("space-y-2", className), ...props }) });
});
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error == null ? void 0 : error.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-[0.8rem] font-medium text-destructive", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function DistributorName$1({ form, isPending }) {
  return /* @__PURE__ */ jsx(
    FormField,
    {
      disabled: isPending,
      name: "distributor_name",
      control: form.control,
      render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Name" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] })
    }
  );
}
function Domain$1({ form, isPending }) {
  const { userId } = useAuth();
  const { data } = useQuery({
    queryKey: ["get_all_domains"],
    queryFn: async () => {
      return (await axios.get(`${BASE_URL_SERVER}/${userId}/domain/get-all-domains`)).data;
    }
  });
  return /* @__PURE__ */ jsx(
    FormField,
    {
      name: "domain_id",
      control: form.control,
      render: ({ field }) => {
        var _a;
        return /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Domain" }),
          /* @__PURE__ */ jsxs(Select, { defaultValue: field.value, onValueChange: field.onChange, children: [
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { disabled: isPending, className: "bg-white", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Domain" }) }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: (_a = data == null ? void 0 : data.data) == null ? void 0 : _a.map((domain, index) => /* @__PURE__ */ jsx(SelectItem, { value: domain.id, children: domain.name }, index)) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        ] });
      }
    }
  );
}
const schema$5 = billSchema.pick({ distributor_name: true, domain_id: true });
function AddDistributorDialog({
  openDialog,
  setOpenDialog
}) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["post_distributor"],
    mutationFn: async (data) => {
      return await axios.post(
        `${BASE_URL_SERVER}/${userId}/distributor`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_distributors"] });
      queryClient.invalidateQueries({ queryKey: ["get_all_distributors"] });
      toast$1.success(`Distributor added`, { position: "bottom-right" });
      setOpenDialog(false);
    }
  });
  const form = useForm({
    resolver: zodResolver(schema$5)
  });
  function onSubmit() {
    form.handleSubmit((data) => {
      mutate(data);
    })();
  }
  return /* @__PURE__ */ jsx(
    DialogModal,
    {
      title: "Create distributor",
      open: openDialog,
      titleIcon: PlusCircle,
      onClose: () => setOpenDialog(false),
      children: /* @__PURE__ */ jsxs("form", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxs(Form, { ...form, children: [
          /* @__PURE__ */ jsx(
            DistributorName$1,
            {
              form,
              isPending
            }
          ),
          /* @__PURE__ */ jsx(Domain$1, { form, isPending })
        ] }),
        /* @__PURE__ */ jsx(Button, { disabled: isPending, type: "button", onClick: onSubmit, children: "Submit" })
      ] })
    }
  );
}
function DistributorName({ form }) {
  const { userId } = useAuth();
  const { data } = useQuery({
    queryKey: ["get_all_distributors"],
    queryFn: async () => {
      return (await axios.get(
        `${BASE_URL_SERVER}/${userId}/distributor/get-all-distributors`
      )).data;
    }
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    openDialog && /* @__PURE__ */ jsx(
      AddDistributorDialog,
      {
        openDialog,
        setOpenDialog
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        name: "distributor_id",
        control: form.control,
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Distributor " }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              onOpenChange: () => openSelect && setOpenSelect(false),
              open: openSelect,
              defaultValue: field.value,
              onValueChange: field.onChange,
              children: [
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  SelectTrigger,
                  {
                    onClick: () => setOpenSelect((prev) => !prev),
                    className: "bg-white",
                    children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select distributor" })
                  }
                ) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  data == null ? void 0 : data.map((dist, index) => /* @__PURE__ */ jsx(SelectItem, { value: dist.id, children: dist.name }, index)),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      onClick: () => {
                        setOpenDialog(true);
                        setOpenSelect(false);
                      },
                      variant: "outline",
                      className: "flex items-center gap-2 w-full",
                      children: [
                        /* @__PURE__ */ jsx(Plus, {}),
                        "Add Distributor"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ]
            }
          )
        ] })
      }
    )
  ] });
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronLeft, { className: cn("h-4 w-4", className2), ...props2 }),
        IconRight: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronRight, { className: cn("h-4 w-4", className2), ...props2 })
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
function DateCreated({ form }) {
  return /* @__PURE__ */ jsx(
    FormField,
    {
      control: form.control,
      name: "date",
      render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "justify-end flex flex-col", children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Date" }),
        /* @__PURE__ */ jsxs(Popover, { children: [
          /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              ),
              children: [
                field.value ? format(field.value, "PPP") : /* @__PURE__ */ jsx("span", { children: "Pick a date" }),
                /* @__PURE__ */ jsx(CalendarIcon, { className: "ml-auto h-4 w-4 opacity-50" })
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
            Calendar,
            {
              className: "!whitespace-normal",
              mode: "single",
              selected: field.value,
              onSelect: field.onChange,
              disabled: (date) => date > /* @__PURE__ */ new Date() || date < /* @__PURE__ */ new Date("1900-01-01"),
              initialFocus: true
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] })
    }
  );
}
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
function IsPaid({ form }) {
  return /* @__PURE__ */ jsx(
    FormField,
    {
      name: "is_paid",
      control: form.control,
      defaultValue: false,
      render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex items-end gap-2 border-black", children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Is Paid" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
          Checkbox,
          {
            className: "bg-white",
            checked: field.value,
            onCheckedChange: field.onChange
          }
        ) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] })
    }
  );
}
function ProductName$1({ form, isPending }) {
  return /* @__PURE__ */ jsx(
    FormField,
    {
      disabled: isPending,
      name: "name",
      control: form.control,
      render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Name" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, onKeyUp: (e) => e.stopPropagation() }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] })
    }
  );
}
function ProductRate$1({ form, isPending }) {
  return /* @__PURE__ */ jsx(
    FormField,
    {
      disabled: isPending,
      name: "rate",
      control: form.control,
      render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Rate ₹" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, onKeyUp: (e) => e.stopPropagation() }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] })
    }
  );
}
const schema$4 = z.object({
  name: z.string(),
  rate: z.coerce.number()
});
function AddProductDialog({ openDialog, setOpenDialog }) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["post_product"],
    mutationFn: async (data) => {
      return await axios.post(
        `${BASE_URL_SERVER}/${userId}/product`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_products"] });
      queryClient.invalidateQueries({ queryKey: ["get_all_products"] });
      setOpenDialog(false);
      toast$1.success(`product added`, { position: "bottom-right" });
    }
  });
  const form = useForm({
    resolver: zodResolver(schema$4)
  });
  function onSubmit() {
    form.handleSubmit((data) => mutate(data))();
  }
  return /* @__PURE__ */ jsx(
    DialogModal,
    {
      dialogContentClassName: "w-[25rem]",
      title: "Create product",
      open: openDialog,
      titleIcon: PlusCircle,
      onClose: () => setOpenDialog(false),
      children: /* @__PURE__ */ jsxs("form", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs(Form, { ...form, children: [
          /* @__PURE__ */ jsx(ProductName$1, { form, isPending }),
          /* @__PURE__ */ jsx(ProductRate$1, { form, isPending })
        ] }),
        /* @__PURE__ */ jsx(Button, { disabled: isPending, type: "button", onClick: onSubmit, children: "Create" })
      ] })
    }
  );
}
function ProductName({ form, index }) {
  const { userId } = useAuth();
  const { data } = useQuery({
    queryKey: ["get_all_products"],
    queryFn: async () => {
      return (await axios.get(`${BASE_URL_SERVER}/${userId}/product/get-all-products`)).data;
    }
  });
  const [openDialog, setOpenDialog] = useState(false);
  function onSelect({
    field,
    selectedValue
  }) {
    var _a;
    field.onChange(selectedValue);
    const rate = (_a = data == null ? void 0 : data.find((item) => item.id === selectedValue)) == null ? void 0 : _a.rate;
    if (!rate) {
      console.error("Rate is undefined");
      return toast$1.error("Something went wrong, please contact the developer.");
    }
    const quantity = form.getValues(`bill_items.${index}.quantity`);
    form.setValue(`bill_items.${index}.product.rate`, rate || 0);
    form.setValue(`bill_items.${index}.amount`, rate * quantity);
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    openDialog && /* @__PURE__ */ jsx(
      AddProductDialog,
      {
        openDialog,
        setOpenDialog
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        name: `bill_items.${index}.product_id`,
        control: form.control,
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "w-1/2 ", children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Name" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              onValueChange: (val) => onSelect({ selectedValue: val, field }),
              defaultValue: field.value,
              children: [
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-white", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Product" }) }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  data == null ? void 0 : data.map((item, index2) => /* @__PURE__ */ jsx(SelectItem, { value: item.id, children: item.name }, index2)),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      className: "w-full",
                      variant: "ghost",
                      onClick: () => setOpenDialog(true),
                      children: [
                        /* @__PURE__ */ jsx(PlusCircle, {}),
                        /* @__PURE__ */ jsx("h1", { children: "Add new Product" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ]
            }
          )
        ] })
      }
    )
  ] });
}
function ProductRate({ form, index }) {
  return /* @__PURE__ */ jsx(
    FormField,
    {
      disabled: true,
      name: `bill_items.${index}.product.rate`,
      control: form.control,
      render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "w-20", children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Rate ₹" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { className: "bg-white", ...field }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] })
    }
  );
}
function ProductQuantity({ form, index }) {
  return /* @__PURE__ */ jsx(
    FormField,
    {
      name: `bill_items.${index}.quantity`,
      control: form.control,
      render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "w-20", children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Quantity" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
          Input,
          {
            className: "bg-white",
            value: field.value,
            onChange: (e) => {
              field.onChange(e.target.value);
              form.setValue(
                `bill_items.${index}.amount`,
                form.getValues().bill_items[index].product.rate * Number(e.target.value)
              );
            }
          }
        ) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] })
    }
  );
}
function ProductAmount({ form, index }) {
  return /* @__PURE__ */ jsx(
    FormField,
    {
      name: `bill_items.${index}.amount`,
      control: form.control,
      render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "w-20", children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Amount" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { disabled: true, className: "bg-white", ...field }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] })
    }
  );
}
function DomainName({ form, isPending }) {
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsx(
    FormField,
    {
      disabled: isPending,
      name: "domain_name",
      control: form.control,
      render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, onKeyUp: (e) => e.stopPropagation() }) }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] })
    }
  ) });
}
const schema$3 = billSchema.pick({ domain_name: true });
function AddDomainDialog({ openDialog, setOpenDialog }) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["post_domain"],
    mutationFn: async (data) => {
      return await axios.post(`${BASE_URL_SERVER}/${userId}/domain`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_domains"] });
      queryClient.invalidateQueries({ queryKey: ["get_all_domains"] });
      setOpenDialog(false);
      toast$1.success(`Domain added`, { position: "bottom-right" });
    }
  });
  const form = useForm({
    resolver: zodResolver(schema$3)
  });
  function onSubmit(e) {
    e.stopPropagation();
    const formData = form.getValues();
    mutate(formData);
  }
  return /* @__PURE__ */ jsx(
    DialogModal,
    {
      title: "Create domain",
      open: openDialog,
      titleIcon: PlusCircle,
      onClose: () => setOpenDialog(false),
      children: /* @__PURE__ */ jsxs("form", { className: "space-y-10", children: [
        /* @__PURE__ */ jsx(DomainName, { form, isPending }),
        /* @__PURE__ */ jsx(Button, { disabled: isPending, type: "button", onClick: onSubmit, children: "Submit" })
      ] })
    }
  );
}
function Domain({ form }) {
  const { userId } = useAuth();
  const { data } = useQuery({
    queryKey: ["get_all_domains"],
    queryFn: async () => {
      return (await axios.get(`${BASE_URL_SERVER}/${userId}/domain/get-all-domains`)).data;
    }
  });
  const [openDialog, setOpenDialog] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AddDomainDialog, { openDialog, setOpenDialog }),
    /* @__PURE__ */ jsx(
      FormField,
      {
        name: "domain_id",
        control: form.control,
        render: ({ field }) => {
          var _a;
          return /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Domain" }),
            /* @__PURE__ */ jsxs(Select, { defaultValue: field.value, onValueChange: (val) => field.onChange(val), children: [
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-white", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Domain" }) }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                (_a = data == null ? void 0 : data.data) == null ? void 0 : _a.map((domain, index) => /* @__PURE__ */ jsx(SelectItem, { value: domain.id, children: domain.name }, index)),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    onClick: () => setOpenDialog(true),
                    variant: "outline",
                    className: "flex items-center gap-2 w-full",
                    children: [
                      /* @__PURE__ */ jsx(Plus, {}),
                      "Add Domain"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          ] });
        }
      }
    )
  ] });
}
const createBillSchema = billSchema.omit({
  distributor_name: true,
  domain_name: true
});
function CreateBillForm({}) {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["post_bill"],
    mutationFn: async (data) => {
      return (await axios.post(`${BASE_URL_SERVER}/${userId}/bill`, data)).data;
    },
    onSuccess: () => {
      toast$1.success("Bill added"), queryClient.invalidateQueries({
        queryKey: ["get_bills"]
      });
    }
  });
  const form = useForm({
    resolver: zodResolver(createBillSchema),
    defaultValues: {
      is_paid: false,
      date: /* @__PURE__ */ new Date(),
      distributor_id: "",
      domain_id: "",
      bill_items: [ITEM_INITIAL_VALUES]
    }
  });
  const fieldArray = useFieldArray({
    name: "bill_items",
    control: form.control
  });
  const watchFieldsArray = form.watch("bill_items");
  const controlledFields = fieldArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index]
    };
  });
  function handleAddItem() {
    fieldArray.append(ITEM_INITIAL_VALUES);
  }
  function handleRemoveItem(index) {
    fieldArray.remove(index);
  }
  const totalAmount = form.getValues().bill_items.reduce((prev, curr) => prev + curr.amount, 0);
  function onSubmit(data) {
    mutate({
      ...data,
      date: data.date.toISOString(),
      totalAmount
    });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), children: [
    /* @__PURE__ */ jsx("div", { className: " flex max-h-[85vh]  border-black  flex-col gap-5 px-5 pb-20 overflow-auto", children: /* @__PURE__ */ jsxs(Form, { ...form, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "\n              lg:w-3/4 \n              w-full \n              grid \n              border-2 \n              lg:grid-cols-3 \n              md:grid-cols-2 \n              grid-cols-1 \n              gap-x-2 \n              gap-y-5\n              border-white\n              p-5\n        ",
          children: [
            /* @__PURE__ */ jsx(Domain, { form }),
            /* @__PURE__ */ jsx(DistributorName, { form }),
            /* @__PURE__ */ jsx(DateCreated, { form }),
            /* @__PURE__ */ jsx(IsPaid, { form })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "\n              flex\n              border-2 \n              flex-col\n              gap-3\n              p-5\n              lg:w-2/3 \n              border-white\n        ",
          children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl", children: "Items" }),
            /* @__PURE__ */ jsx(Separator, { className: "bg-slate-300" }),
            controlledFields.map((field, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: " \n                  flex\n                  gap-x-1\n                  gap-y-5\n        ",
                children: [
                  /* @__PURE__ */ jsx(ProductName, { form, index }),
                  /* @__PURE__ */ jsx(ProductQuantity, { form, index }),
                  /* @__PURE__ */ jsx(ProductRate, { form, index }),
                  /* @__PURE__ */ jsx(ProductAmount, { form, index }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "destructive",
                      className: "rounded-full  size-9 self-end ml-auto",
                      disabled: controlledFields.length === 1,
                      size: "icon",
                      onClick: () => handleRemoveItem(index),
                      children: /* @__PURE__ */ jsx(X, {})
                    }
                  )
                ]
              },
              index
            )),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: handleAddItem,
                type: "button",
                className: "items-center w-fit  ",
                children: [
                  /* @__PURE__ */ jsx(PlusCircle, {}),
                  "Add Product"
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      "footer",
      {
        className: "\n          bottom-0 \n          bg-slate-100 \n          px-5 py-3 \n          md:w-[calc(100vw-15rem)]\n          w-[calc(100vw-5rem)]\n          absolute  \n        ",
        children: /* @__PURE__ */ jsxs("div", { className: "w-full md:w-2/3 flex justify-between", children: [
          /* @__PURE__ */ jsx(Button, { disabled: isPending, type: "submit", children: "Submit" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-xl font-semibold", children: [
            "Total ",
            ": ₹",
            totalAmount
          ] })
        ] })
      }
    )
  ] }) });
}
function CreateBill({}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\n      h-full\n      w-full\n      flex\n      flex-col\n      relative\n    ",
      children: [
        /* @__PURE__ */ jsxs("header", { className: "flex flex-col sticky top-0 bg-inherit z-50 gap-2 p-5", children: [
          /* @__PURE__ */ jsxs(
            "h1",
            {
              className: "text-2xl gap-2 sm:text-3xl font-medium flex items-center\n        ",
              children: [
                /* @__PURE__ */ jsx(PlusCircle, {}),
                " Create Bill"
              ]
            }
          ),
          /* @__PURE__ */ jsx(Separator, { className: "w-full  bg-slate-300" })
        ] }),
        /* @__PURE__ */ jsx(CreateBillForm, {})
      ]
    }
  );
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateBill
}, Symbol.toStringTag, { value: "Module" }));
const schema$2 = billSchema.pick({ distributor_name: true, domain_id: true });
function EditdistributorDialog({
  openDialog,
  setOpenDialog,
  distributor
}) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["update_distributor"],
    mutationFn: async (data) => {
      return await axios.put(
        `${BASE_URL_SERVER}/${userId}/distributor/${distributor.id}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_distributors"] });
      queryClient.invalidateQueries({ queryKey: ["get_all_distributors"] });
      setOpenDialog(false);
      toast$1.success(`Distributor Updated`, { position: "bottom-right" });
    }
  });
  const form = useForm({
    resolver: zodResolver(schema$2),
    defaultValues: {
      distributor_name: distributor.name,
      domain_id: distributor.domain.id
    }
  });
  function onSubmit(e) {
    e.stopPropagation();
    const formData = form.getValues();
    mutate(formData);
  }
  return /* @__PURE__ */ jsx(
    DialogModal,
    {
      title: "Edit distributor",
      open: openDialog,
      titleIcon: PlusCircle,
      onClose: () => setOpenDialog(false),
      children: /* @__PURE__ */ jsxs("form", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxs(Form, { ...form, children: [
          /* @__PURE__ */ jsx(DistributorName$1, { form, isPending }),
          /* @__PURE__ */ jsx(Domain$1, { form, isPending })
        ] }),
        /* @__PURE__ */ jsx(Button, { disabled: isPending, type: "button", onClick: onSubmit, children: "Submit" })
      ] })
    }
  );
}
function TableActionsDropdown$2({ children, distributor }) {
  const queryClient = useQueryClient();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_distributor"],
    mutationFn: async (data) => await axios.delete(
      `${BASE_URL_SERVER}/${userId}/distributor/${data.id}`
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_distributors"] });
      queryClient.invalidateQueries({ queryKey: ["get_all_distributors"] });
      toast$1.success("distributor deleted");
      setIsOpenDeleteDialog(false);
    }
  });
  const dropdownOptions = [
    {
      label: "Edit",
      icon: Edit,
      onSelect: () => setIsOpenEditDialog(true),
      className: ""
    },
    {
      label: "Delete",
      icon: Trash,
      onSelect: () => setIsOpenDeleteDialog(true),
      className: ""
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      EditdistributorDialog,
      {
        distributor,
        openDialog: isOpenEditDialog,
        setOpenDialog: setIsOpenEditDialog
      }
    ),
    isOpenDeleteDialog && /* @__PURE__ */ jsx(
      DeleteDialog,
      {
        disabled: isPending,
        title: "Are you sure?",
        onDelete: () => mutate({ id: distributor.id }),
        open: isOpenDeleteDialog,
        description: "This action cant be undone",
        onClose: () => setIsOpenDeleteDialog(false)
      }
    ),
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children }),
      /* @__PURE__ */ jsx(DropdownMenuContent, { className: "", children: /* @__PURE__ */ jsx(DropdownMenuGroup, { children: dropdownOptions.map((option, index) => /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          className: cn(
            `flex items-center gap-2 cursor-pointer`,
            option.className
          ),
          onClick: option.onSelect,
          children: [
            /* @__PURE__ */ jsx(option.icon, { size: 15 }),
            option.label
          ]
        },
        index
      )) }) })
    ] })
  ] });
}
function DistributorRoute({}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\r\n      flex-col\r\n      h-full\r\n      w-full\r\n      px-10\r\n      py-5\r\n      flex\r\n      gap-5\r\n    ",
      children: [
        /* @__PURE__ */ jsx(Header$2, {}),
        /* @__PURE__ */ jsx(Separator, { className: "border-white border" }),
        /* @__PURE__ */ jsx(Distributor, {})
      ]
    }
  );
}
function Header$2() {
  const [isOpendistributorDialog, setIsOpendistributorDialog] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isOpendistributorDialog && /* @__PURE__ */ jsx(
      AddDistributorDialog,
      {
        openDialog: isOpendistributorDialog,
        setOpenDialog: setIsOpendistributorDialog
      }
    ),
    /* @__PURE__ */ jsxs(
      "header",
      {
        className: "\r\n        w-full \r\n        justify-between\r\n        flex \r\n        items-center \r\n      ",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center ", children: [
            /* @__PURE__ */ jsx(Package, { size: 30 }),
            /* @__PURE__ */ jsx(
              "h1",
              {
                className: "\r\n            font-semibold \r\n            underline-offset-1\r\n            text-2xl\r\n            sm:text-3xl \r\n      ",
                children: "Manage Distributors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => setIsOpendistributorDialog(true),
              children: [
                /* @__PURE__ */ jsx(PlusCircle, {}),
                "Add distributor"
              ]
            }
          )
        ]
      }
    )
  ] });
}
function Distributor() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = 10;
  const { userId } = useAuth();
  const { data, isFetching, isPending } = useQuery({
    queryKey: ["get_distributors", page],
    queryFn: async () => {
      return (await axios.get(
        `${BASE_URL_SERVER}/${userId}/distributor/get-distributors`,
        {
          params: { page, limit }
        }
      )).data;
    }
  });
  const columns2 = [
    {
      accessorKey: "id",
      header: "Id"
    },
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "created_at",
      header: "Date created",
      cell: ({ row }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        format(row.original.created_at, "Pp"),
        " "
      ] })
    },
    {
      accessorKey: "domain.name",
      header: "Domain"
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx(TableActionsDropdown$2, { distributor: row.original, children: /* @__PURE__ */ jsx(Menu, { className: "cursor-pointer" }) });
      }
    }
  ];
  const totalPages = Math.ceil(((data == null ? void 0 : data.count) || 1) / limit);
  return /* @__PURE__ */ jsx(Fragment, { children: isFetching || isPending ? /* @__PURE__ */ jsx(Fragment, { children: "loading..." }) : /* @__PURE__ */ jsx(
    DataTable,
    {
      className: "min-h-[calc(100vh-7rem)]",
      totalPages,
      renderSubComponent: () => /* @__PURE__ */ jsx(Fragment, {}),
      data: data == null ? void 0 : data.data,
      columns: columns2
    }
  ) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DistributorRoute
}, Symbol.toStringTag, { value: "Module" }));
const schema$1 = billSchema.pick({ domain_name: true });
function EditDomainDialog({
  openDialog,
  setOpenDialog,
  domain
}) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["put_domain"],
    mutationFn: async (data) => {
      return await axios.put(
        `${BASE_URL_SERVER}/${userId}/domain/${domain.id}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_domains"] });
      queryClient.invalidateQueries({ queryKey: ["get_all_domains"] });
      setOpenDialog(false);
      toast$1.success(`Domain Updated`, { position: "bottom-right" });
    }
  });
  const form = useForm({
    resolver: zodResolver(schema$1),
    defaultValues: {
      domain_name: domain.name
    }
  });
  function onSubmit(e) {
    e.stopPropagation();
    const formData = form.getValues();
    mutate(formData);
  }
  return /* @__PURE__ */ jsx(
    DialogModal,
    {
      title: "Edit domain",
      open: openDialog,
      titleIcon: PlusCircle,
      onClose: () => setOpenDialog(false),
      children: /* @__PURE__ */ jsxs("form", { className: "space-y-10", children: [
        /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsx(DomainName, { form, isPending }) }),
        /* @__PURE__ */ jsx(Button, { disabled: isPending, type: "button", onClick: onSubmit, children: "Submit" })
      ] })
    }
  );
}
function TableActionsDropdown$1({ children, domain }) {
  const queryClient = useQueryClient();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_domain"],
    mutationFn: async (data) => await axios.delete(
      `${BASE_URL_SERVER}/${userId}/domain/${data.id}`
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_domains"] });
      queryClient.invalidateQueries({ queryKey: ["get_all_domains"] });
      toast$1.success("Domain deleted");
      setIsOpenDeleteDialog(false);
    }
  });
  const dropdownOptions = [
    {
      label: "Edit",
      icon: Edit,
      onSelect: () => setIsOpenEditDialog(true),
      className: ""
    },
    {
      label: "Delete",
      icon: Trash,
      onSelect: () => setIsOpenDeleteDialog(true),
      className: ""
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      EditDomainDialog,
      {
        domain,
        openDialog: isOpenEditDialog,
        setOpenDialog: setIsOpenEditDialog
      }
    ),
    isOpenDeleteDialog && /* @__PURE__ */ jsx(
      DeleteDialog,
      {
        disabled: isPending,
        title: "Are you sure?",
        onDelete: () => mutate({ id: domain.id }),
        open: isOpenDeleteDialog,
        description: "This action cant be undone",
        onClose: () => setIsOpenDeleteDialog(false)
      }
    ),
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children }),
      /* @__PURE__ */ jsx(DropdownMenuContent, { className: "", children: /* @__PURE__ */ jsx(DropdownMenuGroup, { children: dropdownOptions.map((option, index) => /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          className: cn(
            `flex items-center gap-2 cursor-pointer`,
            option.className
          ),
          onClick: option.onSelect,
          children: [
            /* @__PURE__ */ jsx(option.icon, { size: 15 }),
            option.label
          ]
        },
        index
      )) }) })
    ] })
  ] });
}
function DomainRoute({}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\r\n      flex-col\r\n      h-full\r\n      w-full\r\n      px-10\r\n      py-5\r\n      flex\r\n      gap-5\r\n    ",
      children: [
        /* @__PURE__ */ jsx(Header$1, {}),
        /* @__PURE__ */ jsx(Separator, { className: "border-white border" }),
        /* @__PURE__ */ jsx(Domains, {})
      ]
    }
  );
}
function Header$1() {
  const [isOpenDomainDialog, setIsOpenDomainDialog] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isOpenDomainDialog && /* @__PURE__ */ jsx(
      AddDomainDialog,
      {
        openDialog: isOpenDomainDialog,
        setOpenDialog: setIsOpenDomainDialog
      }
    ),
    /* @__PURE__ */ jsxs(
      "header",
      {
        className: "\r\n        justify-between\r\n        flex \r\n        items-center \r\n        w-full \r\n      ",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center ", children: [
            /* @__PURE__ */ jsx(Package, { size: 30 }),
            /* @__PURE__ */ jsx(
              "h1",
              {
                className: "\r\n            sm:text-3xl \r\n            font-semibold \r\n            underline-offset-1\r\n            text-2xl\r\n      ",
                children: "Manage Domains"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setIsOpenDomainDialog(true), children: [
            /* @__PURE__ */ jsx(PlusCircle, {}),
            "Add Domain"
          ] })
        ]
      }
    )
  ] });
}
function Domains() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = 10;
  const { userId } = useAuth();
  const { data, isFetching, isPending } = useQuery({
    queryKey: ["get_domains", page],
    queryFn: async () => {
      return (await axios.get(`${BASE_URL_SERVER}/${userId}/domain/get-domains`, {
        params: { page, limit }
      })).data;
    }
  });
  const columns2 = [
    {
      accessorKey: "id",
      header: "Id"
    },
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "created_at",
      header: "Date created",
      cell: ({ row }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        format(row.original.created_at, "Pp"),
        " "
      ] })
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx(TableActionsDropdown$1, { domain: row.original, children: /* @__PURE__ */ jsx(Menu, { className: "cursor-pointer" }) });
      }
    }
  ];
  const totalPages = Math.ceil(((data == null ? void 0 : data.count) || 1) / limit);
  return /* @__PURE__ */ jsx(Fragment, { children: isFetching || isPending ? /* @__PURE__ */ jsx(Fragment, { children: "loading..." }) : /* @__PURE__ */ jsx(
    DataTable,
    {
      className: "min-h-[calc(100vh-7rem)]",
      renderSubComponent: () => /* @__PURE__ */ jsx(Fragment, {}),
      data: data == null ? void 0 : data.data,
      totalPages,
      columns: columns2
    }
  ) });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DomainRoute
}, Symbol.toStringTag, { value: "Module" }));
function EditBill({}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\n    h-screen \n    w-[calc(100vw-15rem)] \n    bg-slate-200\n    flex\n    flex-col\n    relative\n    ",
      children: [
        /* @__PURE__ */ jsxs("header", { className: "flex flex-col sticky top-0 bg-inherit z-50 gap-2 p-5", children: [
          /* @__PURE__ */ jsxs(
            "h1",
            {
              className: "text-2xl gap-2 sm:text-3xl font-medium flex items-center\n        ",
              children: [
                /* @__PURE__ */ jsx(Edit, {}),
                " Edit Bill"
              ]
            }
          ),
          /* @__PURE__ */ jsx(Separator, { className: "w-full  bg-slate-300" })
        ] }),
        /* @__PURE__ */ jsx(EditBillForm, {})
      ]
    }
  );
}
function EditBillForm({}) {
  const { billId } = useParams();
  const { data } = useQuery({ queryKey: ["get_bills"] });
  const bill = data == null ? void 0 : data.data.find((bill2) => bill2.id === billId);
  const editBillSchema = billSchema.omit({
    distributor_name: true,
    domain_name: true
  });
  console.log(data);
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["put_bill"],
    mutationFn: async (data2) => {
      return (await axios.put(
        `${BASE_URL_SERVER}/${userId}/bill/${billId}`,
        data2
      )).data;
    },
    onSuccess: () => {
      toast$1.success("Bill edited"), queryClient.invalidateQueries({
        queryKey: ["get_bills"]
      });
    }
  });
  const form = useForm({
    resolver: zodResolver(editBillSchema),
    defaultValues: {
      distributor_id: bill == null ? void 0 : bill.distributor.id,
      domain_id: bill == null ? void 0 : bill.domain.id,
      date: parseISO((bill == null ? void 0 : bill.date) || (/* @__PURE__ */ new Date()).toISOString()),
      is_paid: bill == null ? void 0 : bill.is_paid,
      bill_items: bill == null ? void 0 : bill.bill_items.map((billItem) => ({
        amount: billItem.amount,
        quantity: billItem.quantity,
        product_id: billItem.product.id,
        id: billItem.id,
        product: {
          id: billItem.product.id,
          rate: billItem.product.rate
        }
      }))
    }
  });
  const fieldArray = useFieldArray({
    name: "bill_items",
    control: form.control
  });
  const watchFieldsArray = form.watch("bill_items");
  const controlledFields = fieldArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index]
    };
  });
  function handleAddItem() {
    fieldArray.append(ITEM_INITIAL_VALUES);
  }
  function handleRemoveItem(index) {
    fieldArray.remove(index);
  }
  const totalAmount = form.getValues().bill_items.reduce((prev, curr) => prev + curr.amount, 0);
  function onSubmit(data2) {
    mutate({
      ...data2,
      totalAmount,
      date: data2.date.toISOString()
    });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), children: [
    /* @__PURE__ */ jsx("div", { className: " flex max-h-[85vh]  border-black  flex-col gap-5 px-5 pb-20 overflow-auto", children: /* @__PURE__ */ jsxs(Form, { ...form, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "\n              lg:w-3/4 \n              w-full \n              grid \n              border-2 \n              lg:grid-cols-3 \n              md:grid-cols-2 \n              grid-cols-1 \n              gap-x-2 \n              gap-y-5\n              border-white\n              p-5\n        ",
          children: [
            /* @__PURE__ */ jsx(Domain, { form }),
            /* @__PURE__ */ jsx(DistributorName, { form }),
            /* @__PURE__ */ jsx(DateCreated, { form }),
            /* @__PURE__ */ jsx(IsPaid, { form })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "\n              flex\n              border-2 \n              flex-col\n              gap-3\n              p-5\n              lg:w-2/3 \n              border-white\n        ",
          children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl", children: "Items" }),
            /* @__PURE__ */ jsx(Separator, { className: "bg-slate-300" }),
            controlledFields.map((field, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: " \n                  flex\n                  gap-x-1\n                  gap-y-5\n        ",
                children: [
                  /* @__PURE__ */ jsx(ProductName, { form, index }),
                  /* @__PURE__ */ jsx(ProductQuantity, { form, index }),
                  /* @__PURE__ */ jsx(ProductRate, { form, index }),
                  /* @__PURE__ */ jsx(ProductAmount, { form, index }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "destructive",
                      className: "rounded-full  size-9 self-end ml-auto",
                      disabled: controlledFields.length === 1,
                      size: "icon",
                      onClick: () => handleRemoveItem(index),
                      children: /* @__PURE__ */ jsx(X, {})
                    }
                  )
                ]
              },
              index
            )),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                onClick: handleAddItem,
                type: "button",
                className: "items-center w-fit  ",
                children: [
                  /* @__PURE__ */ jsx(PlusCircle, {}),
                  "Add Product"
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      "footer",
      {
        className: "\n          bottom-0 \n          bg-slate-100 \n          px-5 py-3 \n          md:w-[calc(100vw-15rem)]\n          w-[calc(100vw-5rem)]\n          absolute  \n        ",
        children: /* @__PURE__ */ jsxs("div", { className: "w-full md:w-2/3 flex justify-between", children: [
          /* @__PURE__ */ jsx(Button, { disabled: isPending, type: "submit", children: "Submit" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-xl font-semibold", children: [
            "Total ",
            ": ₹",
            totalAmount
          ] })
        ] })
      }
    )
  ] }) });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditBill
}, Symbol.toStringTag, { value: "Module" }));
const schema = z.object({
  name: z.string(),
  rate: z.coerce.number()
});
function EditProductDialog({ openDialog, setOpenDialog, product }) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["put_product"],
    mutationFn: async (data) => {
      return await axios.put(
        `${BASE_URL_SERVER}/${userId}/product/${product.id}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_products"] });
      queryClient.invalidateQueries({ queryKey: ["get_all_products"] });
      setOpenDialog(false);
      toast$1.success(`Product updated`, { position: "bottom-right" });
    }
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product.name,
      rate: product.rate
    }
  });
  function onSubmit() {
    form.handleSubmit((data) => mutate(data))();
  }
  return /* @__PURE__ */ jsx(
    DialogModal,
    {
      dialogContentClassName: "w-[25rem]",
      title: "Edit Product",
      open: openDialog,
      titleIcon: PlusCircle,
      onClose: () => setOpenDialog(false),
      children: /* @__PURE__ */ jsxs("form", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs(Form, { ...form, children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              disabled: isPending,
              name: "name",
              control: form.control,
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Name" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, onKeyUp: (e) => e.stopPropagation() }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              disabled: isPending,
              name: "rate",
              control: form.control,
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Rate ₹" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, onKeyUp: (e) => e.stopPropagation() }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { disabled: isPending, type: "button", onClick: onSubmit, children: "Create" })
      ] })
    }
  );
}
function TableActionsDropdown({ children, product }) {
  const queryClient = useQueryClient();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_product"],
    mutationFn: async (data) => await axios.delete(
      `${BASE_URL_SERVER}/${userId}/product/${data.id}`
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_products"] });
      queryClient.invalidateQueries({ queryKey: ["get_all_products"] });
      toast$1.success("product deleted");
      setIsOpenDeleteDialog(false);
    }
  });
  const dropdownOptions = [
    {
      label: "Edit",
      icon: Edit,
      onSelect: () => setIsOpenEditDialog(true),
      className: ""
    },
    {
      label: "Delete",
      icon: Trash,
      onSelect: () => setIsOpenDeleteDialog(true),
      className: ""
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      EditProductDialog,
      {
        product,
        openDialog: isOpenEditDialog,
        setOpenDialog: setIsOpenEditDialog
      }
    ),
    isOpenDeleteDialog && /* @__PURE__ */ jsx(
      DeleteDialog,
      {
        disabled: isPending,
        title: "Are you sure?",
        onDelete: () => mutate({ id: product.id }),
        open: isOpenDeleteDialog,
        description: "This action cant be undone",
        onClose: () => setIsOpenDeleteDialog(false)
      }
    ),
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children }),
      /* @__PURE__ */ jsx(DropdownMenuContent, { className: "", children: /* @__PURE__ */ jsx(DropdownMenuGroup, { children: dropdownOptions.map((option, index) => /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          className: cn(
            `flex items-center gap-2 cursor-pointer`,
            option.className
          ),
          onClick: option.onSelect,
          children: [
            /* @__PURE__ */ jsx(option.icon, { size: 15 }),
            option.label
          ]
        },
        index
      )) }) })
    ] })
  ] });
}
function ProductsRoute() {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\r\n      flex-col \r\n      border-red-600\r\n      h-full\r\n      w-full\r\n      flex \r\n      gap-5\r\n      px-5\r\n      py-5\r\n    ",
      children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx(Separator, { className: "border-white border" }),
        /* @__PURE__ */ jsx(ProductsTable, {})
      ]
    }
  );
}
function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AddProductDialog,
      {
        openDialog,
        setOpenDialog
      }
    ),
    /* @__PURE__ */ jsxs(
      "header",
      {
        className: "\r\n        flex \r\n        items-center\r\n        justify-between\r\n        gap-2 \r\n      ",
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "      \r\n          items-center\r\n          flex \r\n          gap-2 \r\n          ",
              children: [
                /* @__PURE__ */ jsx(ShoppingBag, {}),
                /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-semibold", children: "Manage Products" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(Button, { onClick: () => setOpenDialog(true), variant: "outline", children: [
            /* @__PURE__ */ jsx(PlusCircle, {}),
            "Add Product"
          ] })
        ]
      }
    )
  ] });
}
function ProductsTable() {
  const { userId } = useAuth();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = 10;
  const { data } = useQuery({
    queryKey: ["get_products"],
    queryFn: async () => {
      return (await axios.get(`${BASE_URL_SERVER}/${userId}/product/get-products`, {
        params: { page, limit }
      })).data;
    }
  });
  const columns2 = [
    {
      accessorKey: "id",
      header: "Id"
    },
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "rate",
      header: "Rate",
      cell: ({ row }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        "₹ ",
        row.original.rate
      ] })
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        " ",
        format(row.original.created_at, "Pp")
      ] })
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx(TableActionsDropdown, { product: row.original, children: /* @__PURE__ */ jsx(Menu, { className: "cursor-pointer" }) });
      }
    }
  ];
  return /* @__PURE__ */ jsx(
    DataTable,
    {
      renderSubComponent: () => /* @__PURE__ */ jsx(Fragment, {}),
      columns: columns2,
      data: data == null ? void 0 : data.data
    }
  );
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductsRoute
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-cGZI7EQx.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/browser-DrVg5YfN.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CYUpgQow.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/browser-DrVg5YfN.js", "/assets/index-oZfdXCXz.js", "/assets/index-ZiYbebhz.js"], "css": ["/assets/root-DNhjTzCj.css"] }, "routes/_auth+/sign-in.$": { "id": "routes/_auth+/sign-in.$", "parentId": "root", "path": "sign-in/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sign-in._-zdMR14m_.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/index-oZfdXCXz.js", "/assets/browser-DrVg5YfN.js"], "css": [] }, "routes/_auth+/sign-up.$": { "id": "routes/_auth+/sign-up.$", "parentId": "root", "path": "sign-up/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sign-up._-C8Bvyvzd.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/index-oZfdXCXz.js", "/assets/browser-DrVg5YfN.js"], "css": [] }, "routes/_landing+/_index": { "id": "routes/_landing+/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BW5tfedN.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/index-oZfdXCXz.js", "/assets/button-CSuLezZL.js", "/assets/browser-DrVg5YfN.js", "/assets/utils-DgjiVB1k.js"], "css": [] }, "routes/_root+/_layout": { "id": "routes/_root+/_layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_layout-DoL25aq4.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/circle-plus-NuuZ6w6j.js", "/assets/createLucideIcon-DtXzPAI9.js", "/assets/shopping-bag-BNWG7lHb.js", "/assets/package-DBjgMSOw.js", "/assets/browser-DrVg5YfN.js", "/assets/index-oZfdXCXz.js"], "css": [] }, "routes/_root+/bills/_layout": { "id": "routes/_root+/bills/_layout", "parentId": "routes/_root+/_layout", "path": "bills", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_layout-DP89s3WR.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/input-DzGSjn4M.js", "/assets/createLucideIcon-DtXzPAI9.js", "/assets/utils-DgjiVB1k.js"], "css": [] }, "routes/_root+/bills/_index/index": { "id": "routes/_root+/bills/_index/index", "parentId": "routes/_root+/bills/_layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CzS_lXJm.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/DeleteDialog-cewh-vCA.js", "/assets/index-DOh0zPzq.js", "/assets/utils-DgjiVB1k.js", "/assets/index-ZiYbebhz.js", "/assets/index-oZfdXCXz.js", "/assets/square-pen-DMC-qW8D.js", "/assets/browser-DrVg5YfN.js", "/assets/package-DBjgMSOw.js", "/assets/chevron-up-Zz_Bt0yl.js", "/assets/createLucideIcon-DtXzPAI9.js", "/assets/button-CSuLezZL.js"], "css": [] }, "routes/_root+/create-bill/route": { "id": "routes/_root+/create-bill/route", "parentId": "routes/_root+/_layout", "path": "create-bill", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BTx_ToTA.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/form-BKpDzj8W.js", "/assets/schema-Dy7N3xTd.js", "/assets/Domain-BKbDTKpk.js", "/assets/index-DOh0zPzq.js", "/assets/button-CSuLezZL.js", "/assets/index-ZiYbebhz.js", "/assets/index-oZfdXCXz.js", "/assets/circle-plus-NuuZ6w6j.js", "/assets/utils-DgjiVB1k.js", "/assets/AddDistributorDialog-DHilJ0vC.js", "/assets/input-DzGSjn4M.js", "/assets/browser-DrVg5YfN.js", "/assets/chevron-up-Zz_Bt0yl.js", "/assets/createLucideIcon-DtXzPAI9.js", "/assets/AddProductDialog-BJw-AUYz.js", "/assets/AddDomainDialog-C8iWH7sR.js"], "css": [] }, "routes/_root+/distributor/route": { "id": "routes/_root+/distributor/route", "parentId": "routes/_root+/_layout", "path": "distributor", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-Cm175L3I.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/index-oZfdXCXz.js", "/assets/index-DOh0zPzq.js", "/assets/DeleteDialog-cewh-vCA.js", "/assets/AddDistributorDialog-DHilJ0vC.js", "/assets/utils-DgjiVB1k.js", "/assets/index-ZiYbebhz.js", "/assets/form-BKpDzj8W.js", "/assets/schema-Dy7N3xTd.js", "/assets/button-CSuLezZL.js", "/assets/circle-plus-NuuZ6w6j.js", "/assets/square-pen-DMC-qW8D.js", "/assets/package-DBjgMSOw.js", "/assets/browser-DrVg5YfN.js", "/assets/createLucideIcon-DtXzPAI9.js", "/assets/input-DzGSjn4M.js", "/assets/chevron-up-Zz_Bt0yl.js"], "css": [] }, "routes/_root+/domain/route": { "id": "routes/_root+/domain/route", "parentId": "routes/_root+/_layout", "path": "domain", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-DotVMX24.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/index-oZfdXCXz.js", "/assets/index-DOh0zPzq.js", "/assets/DeleteDialog-cewh-vCA.js", "/assets/AddDomainDialog-C8iWH7sR.js", "/assets/utils-DgjiVB1k.js", "/assets/index-ZiYbebhz.js", "/assets/form-BKpDzj8W.js", "/assets/schema-Dy7N3xTd.js", "/assets/button-CSuLezZL.js", "/assets/circle-plus-NuuZ6w6j.js", "/assets/square-pen-DMC-qW8D.js", "/assets/package-DBjgMSOw.js", "/assets/browser-DrVg5YfN.js", "/assets/createLucideIcon-DtXzPAI9.js", "/assets/input-DzGSjn4M.js"], "css": [] }, "routes/_root+/edit-bill.$billId/index": { "id": "routes/_root+/edit-bill.$billId/index", "parentId": "routes/_root+/_layout", "path": "edit-bill/:billId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DSOXlAJm.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/form-BKpDzj8W.js", "/assets/schema-Dy7N3xTd.js", "/assets/index-DOh0zPzq.js", "/assets/index-ZiYbebhz.js", "/assets/index-oZfdXCXz.js", "/assets/Domain-BKbDTKpk.js", "/assets/button-CSuLezZL.js", "/assets/square-pen-DMC-qW8D.js", "/assets/circle-plus-NuuZ6w6j.js", "/assets/utils-DgjiVB1k.js", "/assets/createLucideIcon-DtXzPAI9.js", "/assets/browser-DrVg5YfN.js", "/assets/AddDistributorDialog-DHilJ0vC.js", "/assets/input-DzGSjn4M.js", "/assets/chevron-up-Zz_Bt0yl.js", "/assets/AddProductDialog-BJw-AUYz.js", "/assets/AddDomainDialog-C8iWH7sR.js"], "css": [] }, "routes/_root+/products/route": { "id": "routes/_root+/products/route", "parentId": "routes/_root+/_layout", "path": "products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-DLRt7p0t.js", "imports": ["/assets/index-CVfE49ll.js", "/assets/index-oZfdXCXz.js", "/assets/index-DOh0zPzq.js", "/assets/DeleteDialog-cewh-vCA.js", "/assets/AddProductDialog-BJw-AUYz.js", "/assets/utils-DgjiVB1k.js", "/assets/index-ZiYbebhz.js", "/assets/form-BKpDzj8W.js", "/assets/input-DzGSjn4M.js", "/assets/button-CSuLezZL.js", "/assets/circle-plus-NuuZ6w6j.js", "/assets/square-pen-DMC-qW8D.js", "/assets/shopping-bag-BNWG7lHb.js", "/assets/browser-DrVg5YfN.js", "/assets/createLucideIcon-DtXzPAI9.js"], "css": [] } }, "url": "/assets/manifest-35b0bf44.js", "version": "35b0bf44" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_auth+/sign-in.$": {
    id: "routes/_auth+/sign-in.$",
    parentId: "root",
    path: "sign-in/*",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_auth+/sign-up.$": {
    id: "routes/_auth+/sign-up.$",
    parentId: "root",
    path: "sign-up/*",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_landing+/_index": {
    id: "routes/_landing+/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_root+/_layout": {
    id: "routes/_root+/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_root+/bills/_layout": {
    id: "routes/_root+/bills/_layout",
    parentId: "routes/_root+/_layout",
    path: "bills",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_root+/bills/_index/index": {
    id: "routes/_root+/bills/_index/index",
    parentId: "routes/_root+/bills/_layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_root+/create-bill/route": {
    id: "routes/_root+/create-bill/route",
    parentId: "routes/_root+/_layout",
    path: "create-bill",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_root+/distributor/route": {
    id: "routes/_root+/distributor/route",
    parentId: "routes/_root+/_layout",
    path: "distributor",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_root+/domain/route": {
    id: "routes/_root+/domain/route",
    parentId: "routes/_root+/_layout",
    path: "domain",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_root+/edit-bill.$billId/index": {
    id: "routes/_root+/edit-bill.$billId/index",
    parentId: "routes/_root+/_layout",
    path: "edit-bill/:billId",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_root+/products/route": {
    id: "routes/_root+/products/route",
    parentId: "routes/_root+/_layout",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
