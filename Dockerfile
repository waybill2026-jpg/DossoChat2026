# .NET 8 SDK kullanarak derleme yapıyoruz
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Proje dosyalarını kopyala ve restore et
COPY . ./
RUN dotnet restore

# Yayınla (Publish)
RUN dotnet publish -c Release -o out

# Çalıştırma ortamı (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Projenin DLL adını buraya yaz (DossoChat26.dll olduğunu varsayıyorum)
ENTRYPOINT ["dotnet", "DossoChat26.dll"]
