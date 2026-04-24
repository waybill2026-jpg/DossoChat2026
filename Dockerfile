# 1. SDK Aşaması (Derleme)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Proje dosyasını kopyala (Dosya adın neyse onu yazar)
# Eğer proje adın farklıysa *.csproj şeklinde kopyalamak en güvenlisidir
COPY *.csproj ./
RUN dotnet restore

# Kalan her şeyi kopyala ve derle
COPY . .
RUN dotnet publish -c Release -o /app/publish

# 2. Runtime Aşaması (Çalıştırma)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# KRİTİK AYAR: .NET 8'in Render'da çalışması için portu zorla
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# DİKKAT: Buradaki DossoChat26.dll kısmını 
# senin projenin gerçek adıyla (csproj dosyanın adı neyse o) değiştir!
ENTRYPOINT ["dotnet", "DossoChat26.dll"]
