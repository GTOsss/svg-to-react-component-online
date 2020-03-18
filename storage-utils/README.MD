Copy files to '/etc/systemd/system'.


After that:
```
systemctl daemon-reload
systemctl enable clean-storage-svg-to-react.timer && systemctl enable clean-storage-svg-to-react.service
```
