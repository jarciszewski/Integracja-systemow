FROM mongo:latest
COPY gold.csv /gold2.csv
COPY wars.csv /wars.csv
COPY script.sh /script.sh
RUN ["chmod", "777", "script.sh"]
CMD ["./script.sh"]