// SPDX-License-Identifier: MIT
pragma solidity >=0.7.4;
pragma abicoder v2;
// Factory contract for eHealth
contract EHealth {
    uint nextIdSensor;
    // Owner direction 
    address owner = 0x8FcF3B91599C6d5bb93D8c7df9f3974C622b83a4;
    // Oracle direction 
    address public oracleAddress = 0x4B0AF919E9D85ea5CeEbe21ee4F8E3b2A2951b15;
    // Hospitals
    mapping(address=> Hospital) public Hospitals;
    struct Hospital{
        address idHospital;
        string name;
        string state;
        string postalCode;
        bool permission;
    }
    Hospital[] public hospitalCenters;
    // Doctors
    mapping(address=> Doctor) public Doctors;

    struct Doctor {
        address idDoctor;
        string nameDoctor;
        address hospital;
        bool permission;
    }
    // Types of doctors
    Doctor[] public doctorsHospital;
    // Sensors
    mapping(address=> Sensor) public Sensors;
    struct Sensor{
        uint idSensor;
        string MAC;
        string patientName;
        address idDoctor;
        bool active;
        uint[] data;
    }
    // Types of sensors
    Sensor[] public sensorsDoctor;
    // EVENTS 
    event NewHospital(address,string,string,string,bool);
    event DeleteHospital(bool);
    event RefreshHospital(address,string,string,string,bool);
    event readOneHospital(string , string , string , bool);
    event getAllHospital();
    event NewDoctor(address, string, address, bool);
    event DeleteDoctor(bool);
    event RefreshDoctor(address, string, address,bool);
    event readOneDoctor(string, address, bool);
    event NewSensor(uint,string,string,address,bool, uint[]);
    event DeleteSensor(bool);
    event RefreshSensor(uint,string,string,address,bool);
    event readOneSensor (string ,string , address, bool);
    event sendingData(uint[]);
    event viewData(uint[]);

    // *********************************** HOSPITALS ***********************************
    
    // Add hospital in the system
    function AddHospital(address _idHospital, string memory _name, string memory _state, string memory _postalCode ) 
    public onlyOracle (oracleAddress,owner){
        hospitalCenters.push(Hospital(_idHospital, _name, _state, _postalCode, true));
        emit NewHospital(_idHospital, _name, _state, _postalCode, true);
    }
    function FindHospital(address _address) internal view returns(uint){
        for(uint i = 0 ; i < hospitalCenters.length ; i++){
            if(hospitalCenters[i].idHospital==_address){
                return i;
            }
        }
        revert('Hospital not found');
    }
    // Remove permission of the hospital
    function RemoveHospital(address _address) 
    public onlyOracle (oracleAddress,owner){
        uint index = FindHospital(_address);
        hospitalCenters[index].permission=false;
        emit DeleteHospital(hospitalCenters[index].permission);
    }
    // Update hospital data
    function UpdateHospital(address _address, string memory _name, string memory _state, string memory _postalCode, bool _permission ) 
    public onlyOracle (oracleAddress,owner){
        uint index = FindHospital(_address);
        hospitalCenters[index].name=_name;
        hospitalCenters[index].state=_state;
        hospitalCenters[index].postalCode=_postalCode;
        hospitalCenters[index].permission=_permission;
        emit RefreshHospital(hospitalCenters[index].idHospital, 
        hospitalCenters[index].name, 
        hospitalCenters[index].state, 
        hospitalCenters[index].postalCode,
        hospitalCenters[index].permission
        );
    }
    // All hospitals 
    function getAllHospitals() 
    public onlyOracle (oracleAddress,owner) view returns (Hospital[] memory){
                return hospitalCenters;
    }
    // Read hospital data
    function ReadHospital(address _address) 
    public onlyOracle (oracleAddress,owner) view returns(string memory, string memory, string memory, bool){
        uint index = FindHospital(_address);
        return (hospitalCenters[index].name,hospitalCenters[index].state,
        hospitalCenters[index].postalCode,hospitalCenters[index].permission);
    }

    // *********************************** DOCTORS ***********************************

    // Add new health professional
    function AddDoctor(address idDoctor, string memory _nameDoctor, address _hospital) 
    public onlyOracle (oracleAddress,owner){
        FindHospital(_hospital);
        doctorsHospital.push(Doctor(idDoctor, _nameDoctor, _hospital, true));
        emit NewDoctor(idDoctor,_nameDoctor,_hospital,true);
    }
    // Find doctor 
    function FindDoctor(address _id) internal view returns(uint){
        for(uint i = 0 ; i < doctorsHospital.length ; i++){
            if(doctorsHospital[i].idDoctor==_id){
                return i;
            }
        }
        revert('Doctor not found');
    }
    // Remove permission of the doctor
    function RemoveDoctor(address _id) 
    public onlyOracle (oracleAddress,owner){
        uint index = FindDoctor(_id);
        doctorsHospital[index].permission=false;
        emit DeleteDoctor(doctorsHospital[index].permission);
    }
    // Update doctor data
    function UpdateDoctor(address _id, string memory _nameDoctor, address _hospital ,bool _permission) 
    public onlyOracle (oracleAddress,owner){
        uint index = FindDoctor(_id);
        doctorsHospital[index].nameDoctor=_nameDoctor;
        doctorsHospital[index].hospital=_hospital;
        doctorsHospital[index].permission=_permission;
        emit RefreshDoctor(doctorsHospital[index].idDoctor,
        doctorsHospital[index].nameDoctor,
        doctorsHospital[index].hospital,
        doctorsHospital[index].permission
        );
    }
    // Read doctor data
    function ReadDoctor(address _id)
    public onlyOracle (oracleAddress,owner) view returns(string memory, address, bool){
        uint index = FindDoctor(_id);
        return (doctorsHospital[index].nameDoctor,doctorsHospital[index].hospital,doctorsHospital[index].permission);
    }
     // All Doctors 
    function getAllDoctors() 
    public onlyOracle (oracleAddress,owner) view returns (Doctor[] memory){
        return doctorsHospital;
    }
    // All Doctors in a hospital
    function getAllDoctorsInHospital(address _address) 
    public onlyOracle (oracleAddress,owner) view returns (Doctor[] memory){
        Doctor[] memory ret = new Doctor[](doctorsHospital.length);
        for (uint i = 0; i< doctorsHospital.length; i++) {
            if(_address == doctorsHospital[i].hospital){
                ret[i]=doctorsHospital[i];
            }
        }
        return ret;
    }

    // *********************************** SENSORS ***********************************

    // Add new sensor in the system 
    function AddSensor(string memory _mac, string memory _patientName, address _idDoctor, bool _active) 
    public onlyDoctor (_idDoctor, oracleAddress,owner){
        FindDoctor(_idDoctor);
        uint[] memory _data;
        sensorsDoctor.push(Sensor(nextIdSensor,_mac, _patientName, _idDoctor, _active, _data));
        emit NewSensor(nextIdSensor,_mac, _patientName, _idDoctor, _active, _data);
        nextIdSensor++;
    }
    // Find sensor 
    function FindSensor(uint _idSensor) internal view returns(uint){
        for(uint i = 0 ; i < sensorsDoctor.length ; i++){
            if(sensorsDoctor[i].idSensor==_idSensor){
                return i;
            }
        }
        revert('Sensor not found');
    }
    // Remove active sensor
    function RemoveSensor(uint _id, address _idDoctor) 
    public onlyDoctor (_idDoctor, oracleAddress,owner){
        uint index = FindSensor(_id);
        sensorsDoctor[index].active=false;
        emit DeleteSensor(sensorsDoctor[index].active);
    }
    // Update sensor data
    function UpdateSensor(uint _id, string memory _mac, string memory _patientName,address _idDoctor, bool _active ) 
    public onlyDoctor (_idDoctor, oracleAddress,owner){
        uint index = FindSensor(_id);
        sensorsDoctor[index].MAC=_mac;
        sensorsDoctor[index].patientName=_patientName;
        sensorsDoctor[index].idDoctor=_idDoctor;
        sensorsDoctor[index].active=_active;
        emit RefreshSensor(sensorsDoctor[index].idSensor,
        sensorsDoctor[index].MAC,
        sensorsDoctor[index].patientName,
        sensorsDoctor[index].idDoctor,
        sensorsDoctor[index].active);
    }
    // Read sensor data
    function ReadSensor(uint _id)
    public onlyOracle (oracleAddress,owner) view returns(string memory,string memory, address, bool){
        uint index = FindSensor(_id);
        return (sensorsDoctor[index].MAC,sensorsDoctor[index].patientName,sensorsDoctor[index].idDoctor,sensorsDoctor[index].active);
    }
     // All Sensors 
    function getAllSensors() 
    public onlyOracle (oracleAddress,owner) view returns (Sensor[] memory){
        return sensorsDoctor;
    }
    // All medical sensors for a doctor
    function getAllSensorOfDoctor (address _idDoctor) 
    public onlyDoctor (_idDoctor, oracleAddress,owner) view returns (Sensor[] memory){
        Sensor[] memory ret = new Sensor[](sensorsDoctor.length);
        for (uint i = 0; i< sensorsDoctor.length; i++) {
            if(_idDoctor == sensorsDoctor[i].idDoctor){
                ret[i]=sensorsDoctor[i];
            }
        }
        return ret;
    }
    // Sensor sending data
    function sendData(uint _idSensor, uint[] memory _data) 
    public onlyOracle(oracleAddress,owner){
        uint index = FindSensor(_idSensor);
        sensorsDoctor[index].data=_data;
    }
    // View data for sensor
    function viewSensorData(uint _idSensor, address _idDoctor) 
    public onlyDoctor (_idDoctor, oracleAddress,owner) view returns(uint[] memory){
        uint index = FindSensor(_idSensor);
        return sensorsDoctor[index].data;
    } 
    // Modifiers
    modifier onlyOracle(address _oracle, address _owner){
        require((oracleAddress == _oracle) || (owner == _owner), 
        "No privileges");
        _;
    }
    modifier onlyDoctor(address _idDoctor,address _oracle, address _owner){
        require((FindDoctor(_idDoctor) < 0) || (oracleAddress == _oracle) || (owner == _owner),"No privileges");
        _;
    }

}