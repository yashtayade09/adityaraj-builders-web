FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements-production.txt requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app/
# Removed COPY dist /dist to prevent build failure when dist is missing
ENV FRONTEND_DIST=/app/dist
EXPOSE 8000
RUN chmod +x /app/entrypoint.sh
CMD ["/app/entrypoint.sh"]
