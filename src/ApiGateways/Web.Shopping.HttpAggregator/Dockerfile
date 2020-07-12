#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["ApiGateways/Web.Shopping.HttpAggregator/Web.Shopping.HttpAggregator.csproj", "ApiGateways/Web.Shopping.HttpAggregator/"]
RUN dotnet restore "ApiGateways/Web.Shopping.HttpAggregator/Web.Shopping.HttpAggregator.csproj"
COPY . .
WORKDIR "/src/ApiGateways/Web.Shopping.HttpAggregator"
RUN dotnet build "Web.Shopping.HttpAggregator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Web.Shopping.HttpAggregator.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Web.Shopping.HttpAggregator.dll"]