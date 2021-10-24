## Sample

```shell
$ grpcurl -plaintext -d '{"isbn": "9784003900048"}' -proto ./src/protobufs/bookcover.proto localhost:5000 henkenclub.bookcover.v1.Bookcover/FindFromISBN
```
