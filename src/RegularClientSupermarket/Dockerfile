#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["RegularClientSupermarket/RegularClientSupermarket.csproj", "RegularClientSupermarket/"]
COPY ["RegularClientSupermarket.ApplicationService/RegularClientSupermarket.ApplicationService.csproj", "RegularClientSupermarket.ApplicationService/"]
COPY ["RegularClientSupermarket.DataAccess/RegularClientSupermarket.DataAccess.csproj", "RegularClientSupermarket.DataAccess/"]
COPY ["RegularClientSupermarket.Core/RegularClientSupermarket.Core.csproj", "RegularClientSupermarket.Core/"]
RUN dotnet restore "RegularClientSupermarket/RegularClientSupermarket.csproj"
COPY . .
WORKDIR "/src/RegularClientSupermarket"
RUN dotnet build "RegularClientSupermarket.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RegularClientSupermarket.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RegularClientSupermarket.dll"]