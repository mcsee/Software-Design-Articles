import uuid

def create_bucket(account_id, region):
    unique_id = uuid.uuid4().hex
    # This number is not deterministic
    # is a way to generate a random UUID
    # (Universally Unique Identifier) 
    # in Python and then retrieve it as a hexadecimal string.
    bucket_name =
       f"aws-glue-assets-{unique_id}-{account_id}-{region}"
    create_s3_bucket(bucket_name)
    verify_bucket_ownership(bucket_name, account_id)