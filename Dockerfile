FROM node:24.12.0

WORKDIR /usr/src/smart-brain-api

COPY  ./ ./

RUN npm install

CMD ["/bin/bash"]
