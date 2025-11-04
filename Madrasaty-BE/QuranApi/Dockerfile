# ============================
# 1️⃣ Build Stage
# ============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy both projects from within the build context
COPY ./QuranApi ./QuranApi
COPY ./QuranModels ./QuranModels

WORKDIR /source/QuranApi
RUN dotnet restore QuranApi.csproj
RUN dotnet publish QuranApi.csproj -c Release -o /app/publish

# ============================
# 2️⃣ Runtime Stage
# ============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "QuranApi.dll"]
