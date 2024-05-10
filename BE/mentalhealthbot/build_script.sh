echo "Building Start"
#!/bin/bash

echo "installation start"
# Download Python 3.10.12
curl -O https://www.python.org/ftp/python/3.10.12/Python-3.10.12.tgz

# Extract Python source code
tar -xf Python-3.10.12.tgz

# Compile and Install Python 3.10.12
cd Python-3.10.12
./configure --enable-optimizations --prefix=/vercel/path0/.vercel/python
make -j 4
make install

# Verify Python Installation
/vercel/path0/.vercel/python/bin/python3.10 --version

# Install pip 22.0.2
/vercel/path0/.vercel/python/bin/python3.10 -m ensurepip
/vercel/path0/.vercel/python/bin/python3.10 -m pip install --upgrade pip==22.0.2

# Verify pip Installation
/vercel/path0/.vercel/python/bin/pip3.10 --version

# Use the locally installed Python and pip
export PATH="/vercel/path0/.vercel/python/bin:$PATH"
export PYTHON_BIN_PATH="/vercel/path0/.vercel/python/bin/python3.10"
export PIP_BIN_PATH="/vercel/path0/.vercel/python/bin/pip3.10"
echo "installation end"

pwd
cd /vercel/path0/
ls

# Install Python packages
$PIP_BIN_PATH install -r requirements.txt

# Collect static files
$PYTHON_BIN_PATH manage.py collectstatic

echo "Building end"