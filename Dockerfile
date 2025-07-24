FROM ruby:3.2

# Instala dependências do sistema
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# Define o diretório do app
WORKDIR /app

# Copia os arquivos do bundle
COPY Gemfile* ./

# Instala as gems
RUN bundle install

# Copia o restante do projeto
COPY . .

# Expõe a porta padrão do Rails
EXPOSE 3000

# Comando padrão
CMD ["bash", "-c", "rm -f tmp/pids/server.pid && bundle exec rails server -b 0.0.0.0"]
