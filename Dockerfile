# 1. SDK Aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Proje dosyasını kopyala ve restore et
# (Eğer proje bir klasör içindeyse path'i ona göre düzenlemelisin, 
# ama ana dizindeyse bu kod çalışır)
COPY *.csproj ./
RUN dotnet restore

# Tüm dosyaları kopyala ve derle
COPY . .
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# 2. Runtime Aşaması
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Port ayarı
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# --- KRİTİK DÜZELTME BURASI ---
# Proje adın DOSSOCHAT26 olduğu için çıkış DLL adı budur.
# Manuel yazmak en güvenli yoldur.
ENTRYPOINT ["dotnet", "DOSSOCHAT26.dll"]
