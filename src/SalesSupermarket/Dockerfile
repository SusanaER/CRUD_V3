#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["SalesSupermarket/SalesSupermarket.csproj", "SalesSupermarket/"]
COPY ["SalesSupermarket.Core/SalesSupermarket.Core.csproj", "SalesSupermarket.Core/"]
COPY ["SalesSupermarket.DataAccess/SalesSupermarket.DataAccess.csproj", "SalesSupermarket.DataAccess/"]
COPY ["SalesSupermarket.ApplicationServices/SalesSupermarket.ApplicationService.csproj", "SalesSupermarket.ApplicationServices/"]
RUN dotnet restore "SalesSupermarket/SalesSupermarket.csproj"
COPY . .
WORKDIR "/src/SalesSupermarket"
RUN dotnet build "SalesSupermarket.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SalesSupermarket.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SalesSupermarket.dll"]
