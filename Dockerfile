# Use a imagem base do Nginx
FROM nginx:alpine

# Remova a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d

# Copie a build estática para o diretório de conteúdo estático do Nginx
COPY out /usr/share/nginx/html

# Expõe a porta 80 para o tráfego HTTP
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]