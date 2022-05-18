#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["ProductsSupermarket/ProductsSupermarket.csproj", "ProductsSupermarket/"]
COPY ["ProductsSupermarket.ApplicationService/ProductsSupermarket.ApplicationService.csproj", "ProductsSupermarket.ApplicationService/"]
COPY ["ProductsSupermarket.Core/ProductsSupermarket.Core.csproj", "ProductsSupermarket.Core/"]
COPY ["ProductsSupermarket.DataAccess/ProductsSupermarket.DataAccess.csproj", "ProductsSupermarket.DataAccess/"]
RUN dotnet restore "ProductsSupermarket/ProductsSupermarket.csproj"
COPY . .
WORKDIR "/src/ProductsSupermarket"
RUN dotnet build "ProductsSupermarket.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ProductsSupermarket.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProductsSupermarket.dll"]