/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DocsLayout from 'src/layouts/DocsLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import AboutView from 'src/views/pages/AboutView';
import BookaDemoView from 'src/views/pages/BookaDemoView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';


const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/create-company',
    component: lazy(() => import('src/views/auth/CreateCompany'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/create-team',
    component: lazy(() => import('src/views/auth/CreateTeam'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/create-admin-user',
    component: lazy(() => import('src/views/auth/CreateAdminUser'))
  },
  ,
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/reports/dashboard" />
      },
      {
        exact: true,
        path: '/app/account',
        component: lazy(() => import('src/views/pages/AccountView'))
      },
      {
        exact: true,
        path: '/app/reports/dashboard',
        component: lazy(() => import('src/views/reports/DashboardView'))
      },
      {
        exact: true,
        path: '/app/reports',
        component: () => <Redirect to="/app/reports/dashboard" />
      },
      {
        exact: true,
        path: '/app/feedDB/:feedType',
        component: lazy(() => import('src/views/Feed/Feed'))
      },
      {
        exact: true,
        path: '/app/vulDB',
        component: lazy(() => import('src/views/VuldbLogin/VuldbLogin'))
      },
      {
        exact: true,
        path: '/app/CVE/:cve',
        component: lazy(() => import('src/views/CVE/CVE'))
      },
      {
        exact: true,
        path: '/app/management/Alerts',
        component: lazy(() => import('src/views/management/Alerts/AlertsResponse'))
      },
      {
        exact: true,
        path: '/app/management/ProjectsReports/:reportType',
        component: lazy(() => import('src/views/ProjectsReports/ProjectsReports'))
      },
      {
        exact: true,
        path: '/app/admin/:panelType',
        component: lazy(() => import('src/views/Admin/Language/Language'))
      },
      {
        exact: true,
        path: '/app/admin/editLanguage/:panelType/:panel',
        component: lazy(() => import('src/views/Admin/Language/EditLanguage/EditLanguage'))
      },
      {
        exact: true,
        path: '/app/management/customers',
        component: lazy(() => import('src/views/management/CustomerListView'))
      },
      {
        exact: true,
        path: '/app/management/customers/:customerId',
        component: lazy(() => import('src/views/management/CustomerDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/customers/:customerId/edit',
        component: lazy(() => import('src/views/management/CustomerEditView'))
      },
      {
        exact: true,
        path: '/app/management/products',
        component: lazy(() => import('src/views/management/ProductListView'))
      },
      {
        exact: true,
        path: '/app/management/products/create',
        component: lazy(() => import('src/views/management/ProductCreateView'))
      },
      {
        exact: true,
        path: '/app/management/orders',
        component: lazy(() => import('src/views/management/OrderListView'))
      },
      {
        exact: true,
        path: '/app/management/orders/:orderId',
        component: lazy(() => import('src/views/management/OrderDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/invoices',
        component: lazy(() => import('src/views/management/InvoiceListView'))
      },
      {
        exact: true,
        path: '/app/management/invoices/:invoiceId',
        component: lazy(() => import('src/views/management/InvoiceDetailsView'))
      },
      {
        exact: true,
        path: '/app/management',
        component: () => <Redirect to="/app/management/customers" />
      },
      {
        exact: true,
        path: '/app/calendar',
        component: lazy(() => import('src/views/calendar/CalendarView'))
      },
      {
        exact: true,
        path: '/app/kanban',
        component: lazy(() => import('src/views/kanban/KanbanView'))
      },
      {
        exact: true,
        path: [
          '/app/mail/label/:customLabel/:mailId?',
          '/app/mail/:systemLabel/:mailId?'
        ],
        component: lazy(() => import('src/views/mail/MailView'))
      },
      {
        exact: true,
        path: '/app/mail',
        component: () => <Redirect to="/app/mail/all" />
      },
      {
        exact: true,
        path: '/app/projects/overview',
        component: lazy(() => import('src/views/projects/OverviewView'))
      },
      {
        exact: true,
        path: '/app/projects/browse',
        component: lazy(() => import('src/views/projects/ProjectBrowseView'))
      },
      {
        exact: true,
        path: '/app/projects/create',
        component: lazy(() => import('src/views/projects/ProjectCreateView'))
      },
      {
        exact: true,
        path: '/app/projects/:id',
        component: lazy(() => import('src/views/projects/ProjectDetailsView'))
      },
      {
        exact: true,
        path: '/app/projects',
        component: () => <Redirect to="/app/projects/browse" />
      },
      {
        exact: true,
        path: '/app/social/feed',
        component: lazy(() => import('src/views/social/FeedView'))
      },
      {
        exact: true,
        path: '/app/social/profile',
        component: lazy(() => import('src/views/social/ProfileView'))
      },
      {
        exact: true,
        path: '/app/social',
        component: () => <Redirect to="/app/social/profile" />
      },
      {
        exact: true,
        path: '/app/extra/charts/apex',
        component: lazy(() => import('src/views/extra/charts/ApexChartsView'))
      },
      {
        exact: true,
        path: '/app/extra/forms/formik',
        component: lazy(() => import('src/views/extra/forms/FormikView'))
      },
      {
        exact: true,
        path: '/app/extra/forms/redux',
        component: lazy(() => import('src/views/extra/forms/ReduxFormView'))
      },
      {
        exact: true,
        path: '/app/extra/editors/draft-js',
        component: lazy(() => import('src/views/extra/editors/DraftEditorView'))
      },
      {
        exact: true,
        path: '/app/extra/editors/quill',
        component: lazy(() => import('src/views/extra/editors/QuillEditorView'))
      },
      {
        exact: true,
        path: '/app/productsreports/:projectId/:reportName',
        component: lazy(() => import('src/views/ProductsReports/ProductsReports'))
      }/*,
      {
        exact: true,
        path: '/app/productsreports/:reportType/:reportName',
        component: lazy(() => import('src/views/ProductsReports/ProductsReports'))
      }*/,
      {
        exact: true,
        path: '/app/dashboard/productDetailVul',
        component: lazy(() => import('src/views/ProductDetailVul'))
      },
      {
        exact: true,
        path: '/app/dashboard/pricing',
        component: lazy(() => import('src/views/pages/Pricing'))
      },
      {
        exact: true,
        path: '/app/dashboard/payment',
        component: lazy(() => import('src/views/pages/Payment'))
      },
      {
        exact: true,
        path: '/app/dashboard/paymentresult',
        component: lazy(() => import('src/views/pages/Payment/PaymentResult'))
      },
      {
        exact: true,
        path: '/app/dashboard/paymentresultfailure',
        component: lazy(() => import('src/views/pages/Payment/PaymentResultFailure'))
      },
      {
        exact: true,
        path: '/app/dashboard/integrations',
        component: lazy(() => import('src/views/Integrations'))
      },
      {
        component: () => <Redirect to="/404" />
      },
      
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView
      },
      {
        exact: true,
        path: '/about-us',
        component: AboutView
      },
      {
        exact: true,
        path: '/book-a-demo',
        component: BookaDemoView
      }/*,
      {
        exact: true,
        path: '/vulDB/:feedType',
        component: lazy(() => import('src/views/Feed/Feed'))
      }*/,
      {
        exact: true,
        path: 'app/CVE/:cve',
        component: lazy(() => import('src/views/CVE/CVE'))
      },
      {
        exact: true,
        path: '/library/:product/:app',
        component: lazy(() => import('src/views/Library/Library'))
      },
      {
        exact: true,
        path: '/CVE/:cveStartDate/:cveEndDate',
        component: lazy(() => import('src/views/CVE/CVE'))
      },
      {
        exact: true,
        path: '/Search/CVE',
        component: lazy(() => import('src/views/Search/Search'))
      },
      {
        exact: true,
        path: '/vulDB',
        component: lazy(() => import('src/views/VuldbLogin/VuldbLogin'))
      },
      {
        exact: true,
        path: '/pricing',
        component: lazy(() => import('src/views/pages/Pricing'))
      }, 

      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
