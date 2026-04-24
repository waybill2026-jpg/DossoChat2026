# 1. SDK Aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Her şeyi kopyala (Klasör yapısını korumak için)
COPY . .

# Hata alınan nokta burasıydı. Solution (.sln) üzerinden değil, 
# doğrudan .csproj dosyasını bulup publish ediyoruz.
# 'find' komutu ile projeyi bulup klasör karmaşasından kurtuluyoruz.
RUN dotnet publish $(find . -name "DossoChat26.csproj") -c Release -o /app/publish /p:UseAppHost=false

# 2. Runtime Aşaması
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Port ayarı
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# Önceki hatayı önlemek için DLL adını netleştiriyoruz
ENTRYPOINT ["dotnet", "DossoChat26.dll"]
