# SDK Aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Sadece proje dosyasını kopyala ve restore et (Hata almamak için alt klasöre bakmaz)
COPY *.csproj ./
RUN dotnet restore

# Tüm dosyaları kopyala
COPY . .

# Solution yerine doğrudan projeyi derle (Hata veren kısım burasıydı)
RUN dotnet publish *.csproj -c Release -o /app/publish

# Runtime Aşaması
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Port ayarı
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# ENTRYPOINT dinamik hale getirildi (Proje adın neyse o dll çalışır)
ENTRYPOINT ["sh", "-c", "dotnet $(ls *.dll | head -n 1)"]
