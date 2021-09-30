# MyBlog
My personal blog web application using [React.js](https://reactjs.org/) for front-end and [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet) for back-end. ASP.NET Core project is a web API protected by [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/) so that only authenticated users with the right access permissions can edit the content of the blog. 

# How to run
TBD

### `appsettings.json`/`secrets.json` File Template

```json
{
  "ConnectionStrings": {
    "MyBlogConnection": "Data Source=C:\\BlogDB.db;"
  },
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "ClientId": "Enter_client_id_here",
    "TenantId": "Enter_tenant_id_here"
  }
}
```

### `.env.development` File Template

```
REACT_APP_SERVER_URL=http://localhost:5000
REACT_APP_REDIRECT_URL=http://localhost:3000
REACT_APP_CLIENT_ID=Enter_client_id_here
REACT_APP_TENANT_ID=Enter_tenant_id_here
```
